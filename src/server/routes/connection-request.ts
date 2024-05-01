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
 * /api/connection-request/{request}/mutual/accept:
 *   put:
 *     summary: Accept mutual connection request
 *     description: Accepts a mutual connection request specified by the request ID.
 *     parameters:
 *       - in: path
 *         name: request
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the connection request to accept.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with the accepted connection.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Connection'
 *       '403':
 *         description: Forbidden. User does not have permission to accept this connection request.
 *       '404':
 *         description: Not Found. Connection request not found or unable to create a connection.
 *       '401':
 *         description: Unauthorized. Token is missing or invalid.
 *       '500':
 *         description: Internal Server Error.
 *     examples:
 *       example1:
 *         summary: Example of authorization header
 *         value:
 *           headers:
 *             Authorization: Bearer <JWT-Token>
 * definitions:
 *   Connection:
 *     type: object
 *     properties:
 *       // Define properties of the Connection object here
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


/**
 * @swagger
 * /api/connection-request:
 *   get:
 *     summary: Retrieve connection requests
 *     description: Retrieve connection requests sent to the authenticated user.
 *     security:
 *       - jwt: []
 *     responses:
 *       '200':
 *         description: A successful response with an array of connection requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/ConnectionRequest'
 *       '401':
 *         description: Unauthorized. Token is missing or invalid.
 *       '404':
 *         description: Not Found. No connection requests found.
 *       '500':
 *         description: Internal Server Error.
 *     examples:
 *       example1:
 *         summary: Example of authorization header
 *         value:
 *           headers:
 *             Authorization: Bearer <JWT-Token>
 * definitions:
 *   ConnectionRequest:
 *     type: object
 *     properties:
 *       // Define properties of the ConnectionRequest object here
 */

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
