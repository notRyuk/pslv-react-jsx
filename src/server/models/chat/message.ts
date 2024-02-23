import MessageHandler from "@handlers/chat/message";
import IMessage from "@types_/chat/message";
import { Models } from "@utils/models";
import { Schema, model } from "mongoose";

const handler = new MessageHandler()

const messageSchema = new Schema<IMessage>({
    chat: {
        type: Schema.Types.ObjectId,
        ref: Models.chat
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: Models.user
    },
    message: {
        type: String,
        required: handler.fieldRequired("message")
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = model(Models.chat, messageSchema)
export default Message