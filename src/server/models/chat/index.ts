import ChatHandler from "@handlers/chat";
import IChat from "@types_/chat";
import { Models } from "@utils/models";
import { Schema, model } from "mongoose";

const handler = new ChatHandler()

const chatSchema = new Schema<IChat>({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    members: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: Models.user
        }],
        required: handler.fieldRequired("members")
    }
})

const Chat = model(Models.chat, chatSchema)
export default Chat