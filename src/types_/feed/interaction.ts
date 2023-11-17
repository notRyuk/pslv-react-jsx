import IMongoDocument from "@types_/mongo";
import IPost from "./post";
import IUser from "@types_/user";
import { Time } from "@types_";

export default interface IInteraction extends IMongoDocument {
    post: IMongoDocument["_id"]|IPost
    user: IMongoDocument["_id"]|IUser
    liked: boolean
    comment?: string
    createdAt: Time
}