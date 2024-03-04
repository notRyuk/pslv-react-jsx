import IMongoDocument from "@types_/mongo";
import IUser from ".";

export default interface IReportedUser extends IMongoDocument{
    user : IMongoDocument["_id"]|IUser, 
    by: (IMongoDocument["_id"]|IUser)[]
}