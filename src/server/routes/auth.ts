import UserHandler from "@handlers/user";
import User from "@server/models/user";
import Session from "@server/models/user/session";
import IUser from "@types_/user";
import { downloadFile } from "@utils/file";
import Hash from "@utils/hash";
import { getKeys, getValue, getValues } from "@utils/object";
import { Router } from "express";
import Multer from "multer";

const app = Router()
const multer = Multer()

const handler = new UserHandler()

app.post("/register", multer.single("profilePhoto"), async (req, res) => {
    const body = req.body
    const required = [
        "name.first",
        "name.last",
        "dob",
        "email",
        "phone",
        "password",
        "role"
    ]
    const keys = getKeys(body)
    const values = getValues(body)
    for (const req of required) {
        if (
            !keys.includes(req) ||
            (typeof getValue(keys, values, req) === "string" && !(getValue(keys, values, req) as string).length)
        ) {
            return res.status(404).send(handler.error(handler.fieldRequired(req)))
        }
    }
    let user = new User({
        name: {
            first: getValue(keys, values, "name.first"),
            last: getValue(keys, values, "name.last")
        },
        dob: getValue(keys, values, "dob"),
        email: getValue(keys, values, "email"),
        phone: getValue(keys, values, "phone"),
        password: Hash.create(getValue(keys, values, "password") as string),
        role: getValue(keys, values, "role"),
        ...(keys.includes("bio") && getValue(keys, values, "bio").length && {
            bio: getValue(keys, values, "bio")
        })
    } as IUser)
    if (req.file && ["image/png", "image/jpeg"].includes(req.file.mimetype)) {
        const file = req.file
        const profilePhoto = await downloadFile("profilePhoto." + file.originalname.split(".").pop(), user._id.toString(), file.buffer)
        if (profilePhoto) {
            user.profilePhoto = profilePhoto
        }
    }
    user = await user.save()
    const token = Hash.create(JSON.stringify({
        user: user._id.toString(),
        createAt: Date.now()
    }))
    const session = await Session.create({ user: user._id, token })
    session.user = user
    return res.status(200).send(handler.success(session))
})



export default app