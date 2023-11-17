import ConnectionHandler from "@handlers/user/connection"
import IConnection from "@types_/user/connection"
import { Models } from "@utils/models"
import { model, Schema } from "mongoose"

const handler = new ConnectionHandler()

const connectionSchema = new Schema<IConnection>({
    users: {
        type: [Schema.Types.ObjectId],
        validate: {
            validator: (users: Schema.Types.ObjectId[]) => users.length === 2,
            message: handler.CONNECTION_LENGTH
        }
    }
})

const Connection = model(Models.connection, connectionSchema)
export default Connection