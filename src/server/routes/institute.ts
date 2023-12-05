import InstituteHandler from "@handlers/institute";
import { verifyAdmin, verifyBody, verifyToken } from "@server/middleware/verify";
import Institute from "@server/models/institute";
import IUser from "@types_/user";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new InstituteHandler()

const required = ["name", "contact", "address"]
app.post("/create",
    verifyToken(),
    verifyAdmin(),
    verifyBody(required),
    async (_, res) => {
        const { keys, values, session } = res.locals
        const user = session.user as IUser
        const institute = await Institute.create({
            name: getValue(keys, values, "name"),
            contact: getValue(keys, values, "contact"),
            admin: user._id,
            address: getValue(keys, values, "address"),
            ...(keys.includes("faculty") && {
                faculty: getValue(keys, values, "faculty")
            }),
            ...(keys.includes("courses") && {
                courses: getValue(keys, values, "courses")
            }),
            ...(keys.includes("awards") && {
                awards: getValue(keys, values, "awards")
            })
        })
        if(!institute) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        return res.status(200).send(handler.success(institute))
    }
)