import UserHandler from "@handlers/user"
import IUser, { ProfileRoles } from "@types_/user"
import { Models } from "@utils/models"
import Validator from "@utils/validator"
import { model, Schema } from "mongoose"

const handler = new UserHandler()

const userSchema = new Schema<IUser>({
    name: {
        first: {
            type: String,
            required: handler.fieldRequired("name.first")
        },
        last: {
            type: String,
            required: handler.fieldRequired("name.last")
        }
    },
    dob: {
        type: Date,
        required: handler.fieldRequired("dob")
    },

    email: {
        type: String,
        unique: true,
        required: handler.fieldRequired("email"),
        validate: {
            validator: Validator.email,
            message: handler.fieldInvalid("email")
        }
    },
    phone: {
        type: String,
        unique: true,
        required: handler.fieldRequired("phone"),
        validate: {
            validator: Validator.phone,
            message: handler.fieldInvalid("phone")
        }
    },
    username: {
        type: String,
        unique: true,
        required: handler.fieldRequired("username"),
        validate: {
            validator: Validator.username,
            message: handler.fieldInvalid("username", "Min 4 characters, Starts and ends with an alphabet.")
        }
    },
    password: {
        type: String,
        required: handler.fieldRequired("password")
    },

    bio: String,
    profilePhoto: String,
    role: {
        type: String,
        enum: Object.values(ProfileRoles),
        default: ProfileRoles.student
    },

    student: {
        type: Schema.Types.ObjectId,
        ref: Models.student
    },
    alumni: {
        type: Schema.Types.ObjectId,
        ref: Models.alumni
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: Models.admin
    }
})

const User = model(Models.user, userSchema)
export default User