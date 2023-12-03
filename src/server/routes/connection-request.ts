import ConnectionRequestHandler from "@handlers/user/connection-request";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import ConnectionRequest from "@server/models/user/connection-request";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new ConnectionRequestHandler();

const required = ["from", "to", "type"];

// Create Connection Request
app.post("/create", verifyToken(), verifyBody(required), async (req, res) => {
    const { keys, values } = res.locals;
    const connectionRequest = await ConnectionRequest.create({
        from: getValue(keys, values, "from"),
        to: getValue(keys, values, "to"),
        type: getValue(keys, values, "type"),
        document: getValue(keys, values, "document"),
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
