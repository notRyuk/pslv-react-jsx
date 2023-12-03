import ConnectionHandler from "@handlers/user/connection";
import { verifyToken } from "@server/middleware/verify";
import Connection from "@server/models/user/connection";
import { Router } from "express";

const app = Router();
const handler = new ConnectionHandler();

// Create Connection
app.post("/create", verifyToken(), async (req, res) => {
    const { userIds } = req.body;
    const connection = await Connection.create({
        users: userIds,
    });
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connection));
});

// Retrieve All Connections
app.get("/", async (req, res) => {
    const connections = await Connection.find();
    return res.status(200).send(handler.success(connections));
});

// Retrieve Connection by ID
app.get("/:id", async (req, res) => {
    const connectionId = req.params.id;
    const connection = await Connection.findById(connectionId);
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connection));
});

// Delete Connection by ID
app.delete("/:id", verifyToken(), async (req, res) => {
    const connectionId = req.params.id;
    const connection = await Connection.findByIdAndDelete(connectionId);
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connection));
});

export default app;
