import { Router } from "express"

import authRouter from "./auth"
import profileRouter from "./profile"

const app = Router()

app.use("/auth", authRouter)
app.use("/profile", profileRouter)

app.get("/test", (req, res) => {
    return res.send(req.headers.authorization)
})

export default app