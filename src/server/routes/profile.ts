import UserHandler from "@handlers/user";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import Skill from "@server/models/skill";
import User from "@server/models/user";
import Profile from "@server/models/user/profile";
import IUser from "@types_/user";
import ISession from "@types_/user/session";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new UserHandler()

app.post("/create", verifyToken(), verifyBody(["role"]), async (req, res) => {
    const { keys, values, session } = res.locals
    const user = await User.findById(((session as ISession).user as IUser)._id)
    if(!user) {
        return res.status(404).send(handler.error(handler.MISSING_AUTH_HEADER))
    }
    console.log(values[0])
    const address = await Address.create(req.body?.address)
    let profile =  new Profile({
        address: address._id
    })
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
    user.set("profile", profile)
    const updatedUser = await user.save()
    if(!updatedUser) {
        return res.status(400).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(updatedUser))
})

app.put("/add-skill", verifyToken(), verifyBody(["skill"]), async (_, res) => {
    const { keys, values, session } = res.locals
    const profileId = (session.user as IUser).profile
    if(!profileId) {
        return res.status(404).send(handler.error("Profile id not found! Please create the profile"))
    }
    const profile = await Profile.findById(profileId)
    if(!profile) {
        return res.status(404).send(handler.error("User profile not found! Please create the profile"))
    }
    let skill = await Skill.findOne({name: (getValue(keys, values, "skill")as string).trim()})
    if(!skill) {
        skill = await Skill.create({ name: getValue(keys, values, "skill")})
    }
    if(!skill) {
        return res.status(502).send(handler.error("Internal server error! Please try again"))
    }
    profile.set("skills", [...profile.skills, skill._id])
    const updatedProfile = await profile.save()
    if(!updatedProfile) {
        return res.status(502).send(handler.error("Internal server error! Please try again"))
    }
    return res.status(200).send(handler.success(updatedProfile))
})

app.put("/:id", verifyToken(), verifyBody([]), async (req, res) => {
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
        profile.set("address", req.body?.address)
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