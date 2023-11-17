import { Time } from "@types_";
import IMongoDocument from "@types_/mongo";
import { Schema } from "mongoose";
import IUser from ".";

export default interface IAdmin extends IMongoDocument {
    role: "system"|"institute:{{id}}"
    createdAt: Time
    createdBy?: Schema.Types.ObjectId|IUser
}