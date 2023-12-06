import InstituteHandler from "@handlers/institute";
import { verifyParams, verifyToken } from "@server/middleware/verify";
import Institute from "@server/models/institute";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new InstituteHandler()

app.get("/", verifyToken(), async (_, res) => {
    const institutes = await Institute.find().populate([
        "admin", "address", "faculty", "courses", "awards"
    ]).exec()
    if(!institutes)
        return res.status(404).json(handler.error(handler.STATUS_404));
    return res.status(200).json(handler.success(institutes));
})

app.get("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals;
    const institute = await Institute.findById(getValue(keys, values, "id")).populate([
        "admin", "address", "faculty", "courses", "awards"
    ]).exec()
    if(!institute)
        return res.status(404).json(handler.error(handler.STATUS_404));
    return res.status(200).json(handler.success(institute));
})

export default app