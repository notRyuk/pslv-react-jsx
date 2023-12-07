import { verifyToken } from "@server/middleware/verify"
import Job from "@server/models/job"
import { Router } from "express"

const app = Router()

app.get("/", verifyToken(), async (_, res) => {
    const jobs = await Job.find().populate({ path: "company" }).populate({ path: "from" }).exec() || []
    return res.status(200).send(jobs)
})

export default app