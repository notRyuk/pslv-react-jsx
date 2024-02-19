import MessageHandler from "@handlers/user/message"
import IMessage from "@types_/user/message"
import { Models } from "@utils/models"
import { model, Schema } from "mongoose"

const handler = new MessageHandler()

const messageSchema = new Schema<IMessage>({
    from: {
        type: Schema.Types.ObjectId,
        ref: Models.user,
        required: handler.fieldRequired("from")
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: Models.user,
        required: handler.fieldRequired("to")
    },
    content: {
        type: String,
        required: handler.fieldRequired("type"),
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    document: String
})

const Message = model(Models.message, messageSchema)
export default Message