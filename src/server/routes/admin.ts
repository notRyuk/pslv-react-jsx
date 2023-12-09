import AdminHandler from "@handlers/user/admin";
import { verifyAdmin, verifyParams, verifyToken } from "@server/middleware/verify";
import User from "@server/models/user";
import ConnectionRequest from "@server/models/user/connection-request";
import { ProfileRoles } from "@types_/user";
import { ConnectionTypes } from "@types_/user/connection-request";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new AdminHandler()

app.put("/connection-request/:request/:status", // status = accept / reject
    verifyToken(),
    verifyAdmin(),
    verifyParams(["request", "status"]),
    async (_, res) => {
        const { keys, values } = res.locals
        if(!["reject", "accept"].includes((getValue(keys, values, "status") as string))) {
            return res.status(404).send(handler.error(handler.fieldInvalid("status", "The value can be either accpet or reject")))
        }
        const connectionRequest = await ConnectionRequest.findByIdAndDelete(getValue(keys, values, "request"))
        if (!connectionRequest) {
            return res.status(404).send(handler.error("Connection Request not found! Try with a valid request"))
        }
        if(getValue(keys, values, "status") as string === "reject") {
            return res.status(200).send(handler.success({request: connectionRequest, message: "Successfully rejected the request"}))
        }
        const user = await User.findById(connectionRequest.from)
        if(!user) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        user.role = ProfileRoles.alumni
        const updatedUser = await user.save()
        if(!updatedUser) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        return res.status(200).send({user: updatedUser, message: "Updated the user from student to alumni"})
    }
)

app.get("/alumni-requests", verifyToken(), verifyAdmin(), async (_, res) => {
    const connectionRequests = await ConnectionRequest.find({ type: ConnectionTypes.alumniRequest }).populate({
        path: "from",
        select: "-password"
    }).exec() || []
    return res.status(200).send(handler.success(connectionRequests))
})

export default app
