import express from "express"
import cors from "cors"
import compression from "compression"
import apiRouter from "@server/routes"
import mongoose from "mongoose"

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRouter)

mongoose.connect