import IChat from "@types_/chat";
import { Schema } from "mongoose";

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
    members: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
})