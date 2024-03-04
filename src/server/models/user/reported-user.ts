import IReportedUser from "@types_/user/reported-user"
import { Models } from "@utils/models"
import { model, Schema } from "mongoose"
import ReportedUserHandler from "@handlers/user/reported-user"

const handler = new ReportedUserHandler()

const reportedUserSchema = new Schema<IReportedUser>({
    user: {
        type: Schema.Types.ObjectId,
        ref: Models.user,
        required: handler.fieldRequired("user")
    }, 
    by: [{
        type: Schema.Types.ObjectId,
        ref: Models.user
    }]
})

const ReportedUser = model(Models.reportedUser, reportedUserSchema)
export default ReportedUser