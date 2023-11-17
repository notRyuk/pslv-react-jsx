import { Schema } from "mongoose";

export default interface IMongoDocument {
    _id: Schema.Types.ObjectId|string|number
    __v?: number
}