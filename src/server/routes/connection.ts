import ConnectionHandler from "@handlers/user/connection";
import { verifyToken, verifyParams } from "@server/middleware/verify";
import Connection from "@server/models/user/connection";
import { Router } from "express";
import { getValue } from "@utils/object";
import IUser from "@types_/user";

const app = Router();
const handler = new ConnectionHandler();


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

// app.get("/:user", verifyToken(), verifyParams(["user"]), async (_, res) => {
//     const { keys, values } = res.locals;
//     const connectionRequests = await ConnectionRequest.find({ to: getValue(keys, values, "user") })
//         .populate({
//             path: 'from',
//             match: { _id: { $ne: getValue(keys, values, "user") } } // Exclude the user in params
//         })
//         .exec();

//     if (!connectionRequests) {
//         return res.status(404).send(handler.error(handler.STATUS_404));
//     }
//     return res.status(200).send(handler.success(connectionRequests));
// });


app.get("/", async (_, res) => {
    const connections = await Connection.find();
    return res.status(200).send(handler.success(connections));
});

app.get("/:id", async (req, res) => {
    const connectionId = req.params.id;
    const connection = await Connection.findById(connectionId);
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connection));
});

app.delete("/:id", verifyToken(), async (req, res) => {
    const connectionId = req.params.id;
    const connection = await Connection.findByIdAndDelete(connectionId);
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(connection));
});

app.delete("/delete/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const {session, keys, values} = res.locals;
    const loggedInUserId = (session?.user as IUser)._id
    const targetUserId = getValue(keys, values, "id")

    const connection = await Connection.deleteOne(
        { users: { $all: [loggedInUserId, targetUserId] } },
    );
    if (!connection) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(connection))
});

export default app;
