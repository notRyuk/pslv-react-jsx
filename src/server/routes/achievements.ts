import AchievementHandler from "@handlers/achievement"
import { verifyParams, verifyToken } from "@server/middleware/verify"
import Achievement from "@server/models/achievement"
import { getValue } from "@utils/object"
import { Router } from "express"

const app = Router()
const handler = new AchievementHandler()

/**
* @swagger
* 
*    /:
*    get:
*      summary: Retrieve achievements
*      description: simple route
*        Retrieves a list of achievements.
*     responses:
*        '200':
*          description: A list of achievements
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Achievement'
*      security:
*        - bearerAuth: []
*  components:
*  schemas:
*    Achievement:
*      type: object
*      properties:
*        _id:
*          type: string
*          description: The unique identifier of the achievement.
*        name:
*          type: string
*          description: The name of the achievement.
*        description:
*          type: string
*          description: The description of the achievement.
*        // Add more properties as needed
*  securitySchemes:
*    bearerAuth:
*      type: http
*      scheme: bearer
* 
* */

app.get("/", verifyToken(), async (_, res) => {
    const achievements = await Achievement.find() || []
    return res.status(200).send(handler.success(achievements))
})

app.get("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals;
    const acievement = await Achievement.findById(getValue(keys, values, "id"))
    if(!acievement)
        return res.status(404).json(handler.error(handler.STATUS_404));
    return res.status(200).json(handler.success(acievement));
})

export default app