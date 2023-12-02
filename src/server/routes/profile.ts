import UserHandler from "@handlers/user";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import Profile from "@server/models/user/profile";
import IUser, { ProfileRoles } from "@types_/user";
import ISession from "@types_/user/session";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new UserHandler()

app.post("/create", verifyToken(), verifyBody(["address", "role"]), async (_, res) => {
    const keys: string[] = res.locals.keys
    const values: any[] = res.locals.values
    const user = (res.locals.session as ISession).user as IUser

    const address = await Address.findById(getValue(keys, values, "address"))
    if(!address) {
        return res.status(404).send(handler.STATUS_404)
    }
    let profile = await Profile.findById(user[(getValue(keys, values, "role") as ProfileRoles)])
    if(!profile) {
        profile = new Profile({
            address: address._id
        })
    }
    profile = await profile.save()
    console.log(profile)
    return res.sendStatus(200)
})

app.get("/:role", verifyToken(), async (req, res) => {
    const user = (res.locals.session as ISession).user as IUser
    const role = req.params.role

    console.log(user)

    res.send(role)
})

export default app