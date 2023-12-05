import AchievementHandler from "@handlers/achievement"
import { verifyParams, verifyToken } from "@server/middleware/verify"
import Achievement from "@server/models/achievement"
import { getValue } from "@utils/object"
import { Router } from "express"

const app = Router()
const handler = new AchievementHandler()


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