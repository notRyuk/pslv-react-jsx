import { Time } from "@types_";
import IMongoDocument from "@types_/mongo";
import IProfile from "./profile";
import IAdmin from "./admin";
import IFaculty from "@types_/institute/faculty";

export enum ProfileRoles {
    student = "student",
    alumni = "alumni",
    admin = "admin",
    faculty = "faculty"
}

export default interface IUser extends IMongoDocument {
    name: {
        first: string
        last: string
    }
    dob: Time
    
    email: string
    phone: string
    username: string
    password: string
    
    bio?: string
    profilePhoto?: string
    role: ProfileRoles|string

    student?: IMongoDocument["_id"]|IProfile
    alumni?: IMongoDocument["_id"]|IProfile
    admin?: IMongoDocument["_id"]|IAdmin
    faculty?: IMongoDocument["_id"]|IFaculty
}