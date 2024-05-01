import CompanyHandler from "@handlers/job/company"
import { verifyBody, verifyToken } from "@server/middleware/verify"
import Company from "@server/models/job/company"
import { getValue } from "@utils/object"
import { Router } from "express"

const app = Router()
const handler = new CompanyHandler()

/**
 * @swagger
 * /company/create:
 *   post:
 *     summary: Create a company
 *     description: Endpoint to create a new company
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Company created successfully
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Failed to create company
 */

app.post("/create",
    verifyToken(),
    verifyBody(["name"]),
    async (_, res) => {
        const { keys, values } = res.locals
        const company = await Company.create({
            name: getValue(keys, values, "name"),
            ...(
                keys.includes("description") &&
                getValue(keys, values, "description") &&
                (getValue(keys, values, "description") as string).length &&
                {
                    description: getValue(keys, values, "description")
                }
            )
        })
        if(!company) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        return res.status(200).send(handler.success(company))
    }
)

export default app