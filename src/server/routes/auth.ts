import UserHandler from "@handlers/user";
import { JWT_SECRET, JWT_SESSION_TIMEOUT } from "@server/config";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import User from "@server/models/user";
import Session from "@server/models/user/session";
import IUser from "@types_/user";
import { downloadFile } from "@utils/file";
import Hash from "@utils/hash";
import { getValue } from "@utils/object";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";
import Multer from "multer";

const app = Router()
const multer = Multer()

const handler = new UserHandler()

const registerFields = [
    "name.first",
    "name.last",
    "dob",
    "email",
    "phone",
    "password",
    "role"
]
app.post("/register", multer.single("profilePhoto"), verifyBody(registerFields, handler),  async (req, res) => {
    const { keys, values } = res.locals
    let user = new User({
        name: {
            first: getValue(keys, values, "name.first"),
            last: getValue(keys, values, "name.last")
        },
        dob: getValue(keys, values, "dob"),
        email: getValue(keys, values, "email"),
        phone: getValue(keys, values, "phone"),
        password: getValue(keys, values, "password") as string,
        role: getValue(keys, values, "role"),
        ...(keys.includes("bio") && getValue(keys, values, "bio").length && {
            bio: getValue(keys, values, "bio")
        })
    } as IUser)
    try {
        await user.validate()
        if (req.file && ["image/png", "image/jpeg"].includes(req.file.mimetype)) {
            const file = req.file
            const profilePhoto = await downloadFile("profilePhoto." + file.originalname.split(".").pop(), user._id.toString(), file.buffer)
            if (profilePhoto) {
                user.profilePhoto = profilePhoto
            }
        }
        user = await user.save()
        const token = jwt.sign({
            user: user._id.toString(),
            createdAt: Date.now()
        }, JWT_SECRET, {expiresIn: JWT_SESSION_TIMEOUT})
        const session = await Session.create({ user: user._id, token })
        session.user = user
        return res.status(200).send(handler.success(session))
    }
    catch(err: MongooseError|any) {
        return res.status(401).send(handler.error(err.message))
    }
})

app.post("/login", verifyBody(["email", "password"], handler), async (_, res) => {
    const { keys, values } = res.locals
    const user = await User.findOne({email: getValue(keys, values, "email")})
    if(!user) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    if(!Hash.simpleCompare(getValue(keys, values, "password") as string, user.password)) {
        return res.status(401).send(handler.error("Incorrect password, try again."))
    }
    let session = await Session.findOneAndDelete({user: user._id})
    if(!session) {
        return res.status(408).send(handler.error(handler.STATUS_408))
    }
    const token = jwt.sign({
        user: user._id.toString(),
        createdAt: Date.now()
    }, JWT_SECRET, {expiresIn: JWT_SESSION_TIMEOUT})
    session = await Session.create({user: user._id, token })
    session.user = user
    return res.status(200).send(handler.success(session))
})

app.post("/verify", verifyToken(handler), (_, res) => {
    return res.status(200).send(handler.success(res.locals.session))
})

export default app