import { Router } from "express"

import authRouter from "./auth"
import profileRouter from "./profile"
import userRouter from "./user"
import skillRouter from "./skill"
import skillsRouter from "./skills"
import postRouter from "./post"
import postsRouter from "./posts"
import connectionRequestRouter from "./connection-request"
import connectionRouter from "./connection"
import connectionsRouter from "./connections"
import addressRouter from "./address"
import companyRouter from "./company"
import companiesRouter from "./companies"

const app = Router()

app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/user", userRouter)
app.use("/skill", skillRouter)
app.use("/skills", skillsRouter)
app.use("/post", postRouter)
app.use("/posts", postsRouter)
app.use("/connection-request", connectionRequestRouter)
app.use("/connection", connectionRouter)
app.use("/connections", connectionsRouter)
app.use("/address", addressRouter)
app.use("/company", companyRouter)
app.use("/companies", companiesRouter)

app.get("/test", (req, res) => {
    return res.send(req.headers.authorization)
})

export default app