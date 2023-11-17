import IMongoDocument from "@types_/mongo";
import IUser from ".";

export default interface IConnection extends IMongoDocument {
    users: (IMongoDocument["_id"]|IUser)[]
}