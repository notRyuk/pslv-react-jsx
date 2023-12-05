import JobHandler from "@handlers/job";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Job from "@server/models/job";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new JobHandler()

app.post("/create",
    verifyToken(),
    verifyBody(["from", "title", "description", "company", "experienceYears"]),
    async (_, res) => {
        const { keys, values } = res.locals;
        const job = await Job.create({
            from: getValue(keys, values, "from"),
            title: getValue(keys, values, "title"),
            description: getValue(keys, values, "description"),
            company: getValue(keys, values, "company"),
            experienceYears: getValue(keys, values, "experienceYears"),
            ...(keys.includes("skills") && getValue(keys, values, "skills") && getValue(keys, values, "skills").length && {
                skills: getValue(keys, values, "skills")
            }),
            ...(keys.includes("endsAt") && getValue(keys, values, "endsAt") && getValue(keys, values, "endsAt").length && {
                endsAt: getValue(keys, values, "endsAt")
            }),
            ...(keys.includes("isCompleted") && getValue(keys, values, "isCompleted") && getValue(keys, values, "isCompleted").length && {
                isCompleted: getValue(keys, values, "isCompleted")
            })
        });
        if (!job)
            return res.status(400).json(handler.error(handler.STATUS_404));
        return res.status(200).json(handler.success(job));
    }
)

export default app