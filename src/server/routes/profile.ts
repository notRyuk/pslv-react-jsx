import UserHandler from "@handlers/user";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import Profile from "@server/models/user/profile";
import IUser, { ProfileRoles } from "@types_/user";
import ISession from "@types_/user/session";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new UserHandler()

app.post("/create", verifyToken(), verifyBody(["address", "role"]), async (_, res) => {
    const { keys, values, session } = res.locals
    const user = (session as ISession).user as IUser
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
    if(keys.includes("education")) {
        profile.set("education", getValue(keys, values, "education"))
    }
    if(keys.includes("achievements")) {
        profile.set("achievements", getValue(keys, values, "achievements"))
    }
    if(keys.includes("skills")) {
        profile.set("skills", getValue(keys, values, "skills"))
    }
    if(keys.includes("workExperience")) {
        profile.set("workExperience", getValue(keys, values, "workExperience"))
    }
    profile = await profile.save()
    if(!profile) {
        return res.status(400).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(profile))
})

app.put("/:id", verifyToken(), verifyBody(["address", "role"]), async (req, res) => {
    let profile = await Profile.findById(req.params.id)
    if(!profile) {
        return res.status(400).send(handler.error(handler.STATUS_404))
    }
    const { keys, values } = res.locals
    if(keys.includes("education")) {
        profile.set("education", getValue(keys, values, "education"))
    }
    if(keys.includes("achievements")) {
        profile.set("achievements", getValue(keys, values, "achievements"))
    }
    if(keys.includes("address")) {
        profile.set("address", getValue(keys, values, "address"))
    }
    if(keys.includes("skills")) {
        profile.set("skills", getValue(keys, values, "skills"))
    }
    if(keys.includes("workExperience")) {
        profile.set("workExperience", getValue(keys, values, "workExperience"))
    }
    profile = await profile.save()
    if(!profile) {
        return res.status(400).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(profile))
})

app.delete("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals;
    const profile = await Profile.findByIdAndDelete(getValue(keys, values, "id"))
    if (!profile) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(profile))
})

export default app