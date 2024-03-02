import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import IUser from "@types_/user";
import { getValue } from "@utils/object";
import { Router } from "express";
import Chat from "@server/models/chat";
import ChatHandler from "@handlers/chat";

const app = Router();

const handler = new ChatHandler();

const required = ["user"]
app.post("/", verifyToken(), verifyBody(required), async(_, res)=>{
    const {keys, values, session} = res.locals; 
    const user = (session.user as IUser)._id.toString();
    const otherUser = getValue(keys, values, "user");
    const newChat = await Chat.create({
        members: [user, otherUser],
    })
    if(!newChat){
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(newChat))
})

app.get("/find", verifyToken(), async(_, res)=>{
    const {session} = res.locals;
    const userId = (session.user as IUser)._id;
    const chat = await Chat.find({members: {$in: userId}}).populate([
        { path: "members" },
    ]).exec() || [];
    if(!chat){
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(chat))
})

app.get("/find/:userId", verifyToken(), verifyParams(["userId"]), async(_, res)=>{
    const {keys, values, session} = res.locals;
    const userId = (session.user as IUser)._id;
    const otherUserId = getValue(keys, values, "userId");
    const chat = await Chat.findOne({
        members: { $all: [userId, otherUserId] },
    }).populate([
        { path: "members" },
    ]).exec() || [];
    if(!chat){
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(chat))
})

export default app;