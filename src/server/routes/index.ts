import { Router } from "express"

import authRouter from "./auth"
import profileRouter from "./profile"

const app = Router()

app.use("/auth", authRouter)
app.use("/profile", profileRouter)

export default app