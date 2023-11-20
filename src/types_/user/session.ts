import IMongoDocument from "@types_/mongo";
import IUser from ".";
import { Time } from "@types_";

export default interface ISession extends IMongoDocument {
    user: IMongoDocument["_id"]|IUser
    token: string
    createdAt: Time
}