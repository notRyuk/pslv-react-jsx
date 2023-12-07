import UserHandler from "@handlers/user";
import { verifyAdmin, verifyParams, verifyToken } from "@server/middleware/verify";
import User from "@server/models/user";
import Admin from "@server/models/user/admin";
import Connection from "@server/models/user/connection";
import ConnectionRequest from "@server/models/user/connection-request";
import IUser from "@types_/user";
import IConnection from "@types_/user/connection";
import IConnectionRequest from "@types_/user/connection-request";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new UserHandler()

app.get("/all-users", verifyToken(), async (_, res) => {
    const {session} = res.locals
    const connectionRequests = await ConnectionRequest.find({
        $or: [{ from: (session.user as IUser)._id }, { to: (session.user as IUser)._id }],
    });
    const connectionRequestUserIds = connectionRequests.reduce(
        (userIds: string[], request: IConnectionRequest) => {
            if (request.from.toString() !== (session.user as IUser)._id.toString()) {
                userIds.push(request.from.toString());
            }
            if (request.to.toString() !== (session.user as IUser)._id) {
                userIds.push(request.to.toString());
            }
            return userIds;
        },
        []
    );
    const connections = await Connection.find({
        users: { $in: [(session.user as IUser)._id] },
    });
    const connectionUserIds = connections.reduce(
        (userIds: string[], connection: IConnection) => {
            const otherUser = connection.users.find(
                (user) => user.toString() !== (session.user as IUser)._id.toString()
            );
            if (otherUser) {
                userIds.push(otherUser.toString());
            }
            return userIds;
        },
        []
    );
    const allUserIds = Array.from(new Set([...connectionRequestUserIds, ...connectionUserIds]));
    // console.log(connectionUserIds);
    
    const allUsers = await User.find({
        _id: { $nin: [(session.user as IUser)._id, ...allUserIds] },
    });
    return res.status(200).send(handler.success(allUsers))
});

app.get("/details/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const user = await User.findById(getValue(keys, values, "id")).populate([
        { 
            path: "profile", 
            strictPopulate: false,
            populate: [
                {
                    path: "education", 
                    populate: "institute"
                },
                "achievements",
                "skills",
                "address",
                "workExperience"
            ] 
        },
        { path: "admin", strictPopulate: false },
        { path: "faculty", strictPopulate: false },
    ]).select("-password").exec()
    if (!user) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(user))
})

app.put("/promote/:user/:role", verifyToken(), verifyAdmin(), verifyParams(["user", "role"]), async (_, res) => {
    const { keys, values, session } = res.locals
    const user = await User.findById(getValue(keys, values, "user"))
    if(!user) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    const admin = await Admin.create({
        role: getValue(keys, values, "role"),
        createdBy: (session.user as IUser)._id
    })
    if(!admin) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    user.set("admin", admin._id)
    const updatedUser = await user.save()
    if(!updatedUser) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    updatedUser.admin = admin
    return res.status(200).send(handler.success(updatedUser))
})

export default app