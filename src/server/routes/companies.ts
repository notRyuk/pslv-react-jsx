import CompanyHandler from "@handlers/job/company"
import { verifyToken } from "@server/middleware/verify"
import Company from "@server/models/job/company"
import { Router } from "express"

const app = Router()
const handler = new CompanyHandler()


app.get("/", verifyToken(), async (_, res) => {
    const companies = await Company.find() || []
    return res.status(200).send(handler.success(companies))
})

export default app