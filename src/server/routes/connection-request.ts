import ConnectionRequestHandler from "@handlers/user/connection-request";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Institute from "@server/models/institute";
import Connection from "@server/models/user/connection";
import ConnectionRequest from "@server/models/user/connection-request";
import IUser from "@types_/user";
import { ConnectionTypes } from "@types_/user/connection-request";
import { downloadFile } from "@utils/file";
import Hash from "@utils/hash";
import { getValue } from "@utils/object";
import { Router } from "express";
import Multer from "multer";

const app = Router();
const handler = new ConnectionRequestHandler();
const multer = Multer({
    fileFilter: (_, file, cb) => {
        if (file.originalname.split(".").pop() !== "pdf") {
            return cb(new Error("The input file is not a pdf document"))
        }
        return cb(null, true)
    }
})

const required = ["to", "type"];

/**
 * @swagger
 * /connection-request/create:
 *   post:
 *     summary: Create a connection request
 *     description: Endpoint to create a new connection request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               to:
 *                 type: string
 *               institute:
 *                 type: string
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Connection request created successfully
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Failed to create connection request
 *       '422':
 *         description: Unprocessable Entity
 */

app.post("/create", verifyToken(), multer.single("document"), verifyBody(required), async (req, res) => {
    const { keys, values, session } = res.locals;
    if (!Object.values(ConnectionTypes).includes(getValue(keys, values, "type"))) {
        return res.status(422).send(handler.error(handler.fieldInvalid("type")))
    }
    let url = ""
    const user = (session.user as IUser)._id.toString()
    const request = new ConnectionRequest({
        from: user,
        to: getValue(keys, values, "to"),
        type: getValue(keys, values, "type")
    })
    if (getValue(keys, values, "type") === ConnectionTypes.alumniRequest) {
        const institute = await Institute.findById(getValue(keys, values, "institute"))
        if (!institute) {
            return res.status(422).send(handler.error("Institute not found!! Please add the corresponding institute."))
        }
        request.set("institute", institute._id)
        const file = req.file
        if (!file) {
            return res.status(422).send(handler.error(handler.fieldInvalid("document", "Alumni Request requires a document to upload type pdf.")))
        }
        const originalName = file!.originalname.split(".")
        const mimeType = originalName.pop()
        const fileName = Hash.create(user + "--" + originalName.join(".")).replace(/\//g, "--")
        url = await downloadFile(`${fileName}.${mimeType}`, user, file!.buffer) as string
        request.set("document", url)
    }
    const connectionRequest = await request.save()
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(connectionRequest))
});

/**
 * @swagger
 * /connection-request/{type}:
 *    get:
 *     summary: Get connection requests by type
 *     description: Endpoint to get connection requests by type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of connection request
 *     responses:
 *       '200':
 *         description: Successful retrieval of connection requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConnectionRequest'
 *       '401':
 *         description: Unauthorized access
 *  components:
 *   schemas:
 *     ConnectionRequest:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the connection request.
 *         from:
 *           type: string
 *           description: The ID of the user who sent the request.
 *         type:
 *           type: string
 *           description: The type of the connection request
 */
app.get("/:type", verifyToken(), verifyParams(["type"]), async (_, res) => {
    const { keys, values, session } = res.locals
    const connectionRequests = await ConnectionRequest.find({
        from: (session.user as IUser)._id,
        type: getValue(keys, values, "type")
    }) || []
    return res.status(200).send(handler.success(connectionRequests))
})


// app.get("/:id", async (req, res) => {
//     const connectionRequestId = req.params.id;
//     const connectionRequest = await ConnectionRequest.findById(connectionRequestId)
//     if (!connectionRequest) {
//         return res.status(404).send(handler.error(handler.STATUS_404))
//     }
//     return res.status(200).send(handler.success(connectionRequest))
// })


/**
 * @swagger
 * /connection-request/:request/ignore:
 *   delete:
 *     summary: Ignore a connection request
 *     description: Endpoint to ignore a connection request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: request
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the connection request to ignore
 *     responses:
 *       '200':
 *         description: Connection request ignored successfully
 *       '401': 
 *         description: Unauthorized access
 *       '404':
 *         description: Connection request not found
 */

app.delete("/:request/ignore", verifyToken(), verifyParams(["request"]), async (_, res) => {
    const { keys, values } = res.locals
    const connectionRequest = await ConnectionRequest.findByIdAndDelete(getValue(keys, values, "request"))
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(connectionRequest))
})


/**
 * @swagger
 * /connection-request/:request/mutual/accept:
 *   put:
 *     summary: Accept a mutual connection request
 *     description: Endpoint to accept a mutual connection request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: request
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the mutual connection request to accept
 *     responses:
 *       '200':
 *         description: Mutual connection request accepted successfully
 *       '401':
 *         description: Unauthorized access
 *       '403':
 *         description: Forbidden - Invalid user
 *       '404':
 *         description: Mutual connection request not found
 */

app.put("/:request/mutual/accept", verifyToken(), verifyParams(["request"]), async (_, res) => {
    const { keys, values, session } = res.locals
    const connectionRequest = await ConnectionRequest.findByIdAndDelete(getValue(keys, values, "request")).populate([
        {
            path: "from",
            select: "-password"
        },
        {
            path: "to",
            select: "-password"
        }
    ]).exec()
    if (!connectionRequest) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    const user = session.user as IUser
    if (user._id.toString() !== (connectionRequest.to as IUser)._id.toString()) {
        return res.status(403).send(handler.error("Unauthorized! Invalid user."))
    }
    const connection = await Connection.create({
        users: [(connectionRequest.from as IUser)._id, (connectionRequest.to as IUser)._id]
    })
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(connection))
})

// app.get("/from", verifyToken(), async (_, res) => {
//     const { session } = res.locals
//     console.log("hello")
//     const connectionRequests = await ConnectionRequest.find({ to: (session.user as IUser)._id}).populate({
//         path: "from",
//         select: "-password"
//     }).exec()
//     console.log(connectionRequests);
//     if (!connectionRequests) {
//         return res.status(404).send(handler.error(handler.STATUS_404))
//     }
//     return res.status(200).send(handler.success(connectionRequests))
// })

app.get("/", verifyToken(), async (_, res) => {
    const { session } = res.locals
    const connectionRequests = await ConnectionRequest.find({ to: (session.user as IUser)._id }).populate({
        path: "from",
        select: "-password"
    }).exec()
    if (!connectionRequests) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(connectionRequests))
})

export default app;
