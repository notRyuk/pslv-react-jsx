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
import jobRouter from "./job"
import jobsRouter from "./jobs"
import applicationRouter from "./application"
import applicationsRouter from "./applications"
import adminRouter from "./admin" 
import newsRouter from "./news"
import achievementRouter from "./achievement"
import achievementsRouter from "./achievements"
import educationRouter from "./education"
import workRouter from "./work"
import instituteRouter from "./institute"
import institutesRouter from "./institutes"

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
app.use("/job", jobRouter)
app.use("/jobs", jobsRouter)
app.use("/job-application", applicationRouter)
app.use("/job-applications", applicationsRouter)
app.use("/admin", adminRouter)
app.use("/news", newsRouter)
app.use("/achievement", achievementRouter)
app.use("/achievements", achievementsRouter)
app.use("/education", educationRouter)
app.use("/work", workRouter)
app.use("/institute", instituteRouter)
app.use("/institutes", institutesRouter)

export default app