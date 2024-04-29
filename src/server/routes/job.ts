import JobHandler from "@handlers/job";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Job from "@server/models/job";
import Company from "@server/models/job/company";
import IUser from "@types_/user";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new JobHandler()

app.post("/create",
    verifyToken(),
    verifyBody(["title", "description", "company", "experienceYears"]),
    async (req, res) => {
        const { keys, values, session } = res.locals;
        let company = await Company.findOne({ name: getValue(keys, values, "company") })
        if(!company) {
            company = await Company.create({ name: getValue(keys, values, "company")})
        }
        if(!company) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        const __job = new Job({
            from: (session.user as IUser)._id,
            title: getValue(keys, values, "title"),
            description: getValue(keys, values, "description"),
            company,
            experienceYears: getValue(keys, values, "experienceYears"),
            ...(keys.includes("skills") && {
                skills: req.body.skills 
            }),
            ...(keys.includes("endsAt") && getValue(keys, values, "endsAt") && getValue(keys, values, "endsAt").length && {
                endsAt: getValue(keys, values, "endsAt")
            }),
            ...(keys.includes("isCompleted") && getValue(keys, values, "isCompleted") && getValue(keys, values, "isCompleted").length && {
                isCompleted: getValue(keys, values, "isCompleted")
            })
        });
        __job.set("skills", req.body.skills)
        const job = await __job.save()
        if (!job)
            return res.status(400).json(handler.error(handler.STATUS_404));
        return res.status(200).json(handler.success(job));
    }
)

app.delete("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const job = await Job.findByIdAndDelete(getValue(keys, values, "id"))
    if (!job) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(job))
})

export default app