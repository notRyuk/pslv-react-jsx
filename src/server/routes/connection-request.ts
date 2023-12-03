import ConnectionRequestHandler from "@handlers/user/connection-request";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import ConnectionRequest from "@server/models/user/connection-request";
import { getValue } from "@utils/object";
import { Router } from "express";
import Multer from "multer";
import { Request } from "express";
import { ConnectionTypes } from "@types_/user/connection-request";
import { downloadFile } from "@utils/file";
import IUser from "@types_/user";
import Hash from "@utils/hash";

const app = Router();
const handler = new ConnectionRequestHandler();
const multer = Multer({
    fileFilter: (_, file, cb) => {
        if(file.originalname.split(".").pop() !== "pdf") {
            return cb(new Error("The input file is not a pdf document"))
        }
        return cb(null, true)
    } 
})


const required = ["from", "to", "type"];
app.post("/create", verifyToken(), multer.single("document"), verifyBody(required), async (req, res) => {
    const { keys, values, session } = res.locals;
    if(!Object.values(ConnectionTypes).includes(getValue(keys, values, "type"))) {
        return res.status(422).send(handler.error(handler.fieldInvalid("type")))
    }
    if(getValue(keys, values, "type") === ConnectionTypes.alumniRequest && !req.file) {
        return res.status(422).send(handler.error(handler.fieldInvalid("document", "Alumni Request requires a document to upload type pdf.")))
    }
    const user = (session.user as IUser)._id.toString()
    const file = req.file
    const originalName = file.originalname.split(".")
    const mimeType = originalName.pop()
    const fileName = Hash.create(user+"--"+originalName.join(".")).replace(/\//g, "--")
    const url = await downloadFile(`${fileName}.${mimeType}`, user, file.buffer)
    const connectionRequest = await ConnectionRequest.create({
        from: getValue(keys, values, "from"),
        to: getValue(keys, values, "to"),
        type: getValue(keys, values, "type"),
        ...((keys.includes("document") && url && url.length) && {
            document: url
        })
    });
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connectionRequest));
});

// Retrieve All Connection Requests
app.get("/", async (req, res) => {
    const connectionRequests = await ConnectionRequest.find();
    return res.status(200).send(handler.success(connectionRequests));
});

// Retrieve Connection Request by ID
app.get("/:id", async (req, res) => {
    const connectionRequestId = req.params.id;
    const connectionRequest = await ConnectionRequest.findById(connectionRequestId);
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connectionRequest));
});

// Update Connection Request by ID
app.put("/:id", verifyToken(), verifyBody(required), async (req, res) => {
    const connectionRequestId = req.params.id;
    const { keys, values } = res.locals;
    const connectionRequest = await ConnectionRequest.findByIdAndUpdate(
        connectionRequestId,
        {
            from: getValue(keys, values, "from"),
            to: getValue(keys, values, "to"),
            type: getValue(keys, values, "type"),
            document: getValue(keys, values, "document"),
        },
        { new: true }
    );
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connectionRequest));
});

// Delete Connection Request by ID
app.delete("/:id", verifyToken(), async (req, res) => {
    const connectionRequestId = req.params.id;
    const connectionRequest = await ConnectionRequest.findByIdAndDelete(connectionRequestId);
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connectionRequest));
});

export default app;
