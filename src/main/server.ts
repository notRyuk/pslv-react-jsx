import express from "express"
import cors from "cors"
import compression from "compression"
import apiRouter from "@server/routes"
import mongoose from "mongoose"
import { DB_URL, PORT } from "@server/config"
import { join } from "path"

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", apiRouter)
app.use("/static/files", express.static(join(__dirname, "..", "..", "public")))


mongoose.connect(DB_URL)
.then(() => {
    console.log("Connected to the database")
    app.listen(PORT, () => {
        console.log("App listening on port:", PORT)
    })
})
.catch(console.log)