import { Router } from "express"
import authRouter from "./auth"

const app = Router()

app.use("/auth", authRouter)

app.get("/test", (req, res) => {
    return res.send(req.headers.authorization)
})

export default app