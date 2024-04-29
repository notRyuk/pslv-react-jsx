import JobHandler from "@handlers/job"
import { verifyParams, verifyToken } from "@server/middleware/verify"
import Job from "@server/models/job"
import IUser from "@types_/user"
import { getValue } from "@utils/object"
import { Router } from "express"

const app = Router()
const handler = new JobHandler()

app.get("/", verifyToken(), async (_, res) => {
    const {session} = res.locals
    const userId = (session.user as IUser)._id
    const currentTimestamp = Date.now();
    const jobs = await Job.find({
        endsAt: { $gte: currentTimestamp },
        from: { $ne: userId }
    }).populate({ path: "company" }).populate({ path: "from" }).populate({ path: "skills" }).exec() || [];
    return res.status(200).send(jobs)
})

app.get("/:id", verifyToken(), verifyParams(["id"]),async (_, res) => {
    const { keys, values } = res.locals;
    const job = await Job.find({ from: getValue(keys, values, "id") }).populate({ path: "company" }).populate({ path: "from" }).populate({ path: "skills" }).exec() || [];
    if (!job)
        return res.status(404).json(handler.error(handler.STATUS_404));
    return res.status(200).json(handler.success(job));
})

// Search jobs by title
app.get("/search/:title", verifyToken(), verifyParams(["title"]), async (_, res) => {
    const { keys, values } = res.locals;
    const title = getValue(keys, values, "title")
    if (!title) {
        return res.status(400).json(handler.error(handler.STATUS_404));
    }
    const jobs = await Job.find({
        title: { $regex: new RegExp(title?.toString(), "i") }, // Case-insensitive search
    }).populate({ path: "company" }).populate({ path: "from" }).populate({ path: "skills" }).exec() || [];
    
    if (!jobs) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).json(handler.success(jobs));
});

export default app