import IMongoDocument from "@types_/mongo";
import IUser from ".";
import { Time } from "@types_";

export default interface IMessage extends IMongoDocument {
    from: IMongoDocument["_id"]|IUser
    to: IMongoDocument["_id"]|IUser
    content: string
    createdAt: Time
    document?: string
}