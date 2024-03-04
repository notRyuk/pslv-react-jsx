import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import IUser from "@types_/user";
import { getValue } from "@utils/object";
import { Router } from "express";
import Message from "@server/models/chat/message";
import MessageHandler from "@handlers/chat/message";

const app = Router();

const handler = new MessageHandler();

const required = ["chatId", "message"]
app.post("/", verifyToken(), verifyBody(required), async(_, res)=>{
    const {keys, values, session} = res.locals; 
    const user = (session.user as IUser)._id.toString();
    const chatId = getValue(keys, values, "chatId");
    const message = getValue(keys, values, "message");

    const newMessage = await Message.create({
        chat: chatId,
        sender: user,
        message: message
    })
    if(!newMessage){
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(newMessage))
})

app.get("/:chatId", verifyToken(), verifyParams(["chatId"]), async(_, res)=>{
    const {keys, values} = res.locals;
    const chatId = getValue(keys, values, "chatId");
    const messages = await Message.find({
        chat: chatId
    })
    if(!messages){
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(messages))
})

export default app;