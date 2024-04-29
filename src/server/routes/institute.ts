import InstituteHandler from "@handlers/institute";
import { verifyAdmin, verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import Institute from "@server/models/institute";
import Admin from "@server/models/user/admin";
import IUser from "@types_/user";
import IAdmin from "@types_/user/admin";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new InstituteHandler()

const required = [
    "name",
]
app.post("/create",
    verifyToken(),
    verifyAdmin(),
    verifyBody(required),
    async (req, res) => {
        const { keys, values, session } = res.locals
        const user = session.user as IUser
        const address = await Address.create(req.body.address)
        if (!address) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        const institute = await Institute.create({
            name: getValue(keys, values, "name"),
            contact: req.body.contact,
            admin: user._id,
            address: address._id,
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
        if (!institute) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        const admin = await Admin.findByIdAndUpdate((user.admin as IAdmin)?._id, { $set: { institute: institute._id } })
        if(!admin) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        return res.status(200).send(handler.success(institute))
    }
)

app.delete("/:id", verifyToken(), verifyAdmin(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals;
    const institute = await Institute.findByIdAndDelete(getValue(keys, values, "id"));
    if (!institute) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(institute));
});

export default app