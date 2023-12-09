import JobHandler from "@handlers/job"
import { verifyToken } from "@server/middleware/verify"
import Job from "@server/models/job"
import IUser from "@types_/user"
import { Router } from "express"

const app = Router()
const handler = new JobHandler()

app.get("/", verifyToken(), async (_, res) => {
    const jobs = await Job.find().populate({ path: "company" }).populate({ path: "from" }).exec() || []
    return res.status(200).send(jobs)
})

app.get("/user", verifyToken(),  async (_, res) => {
    const { session } = res.locals;
    const job = await Job.find({ from: (session.user as IUser)._id })
    if(!job)
        return res.status(404).json(handler.error(handler.STATUS_404));
    return res.status(200).json(handler.success(job));
})

export default app