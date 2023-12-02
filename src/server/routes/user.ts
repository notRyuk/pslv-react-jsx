import UserHandler from "@handlers/user";
import { verifyParams, verifyToken } from "@server/middleware/verify";
import User from "@server/models/user";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new UserHandler()

app.get("/details/:id", verifyToken(), verifyParams(["id"]), async (req, res) => {
    const { keys, values } = res.locals
    const user = await User.findById(getValue(keys, values, "id")).populate(["profile", "profile.address", "student", "alumni", "admin", "faculty"])
    if(!user) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(user))
})

export default app