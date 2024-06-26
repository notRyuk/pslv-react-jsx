if (__filename.endsWith(".js")) {
    require("module-alias/register")
    const { addAliases } = require("module-alias")
    addAliases({
        "@*": `build/src/*`
    })
}

import { ErrorHandler } from "@handlers/error"
import { DB_URL, PORT } from "@server/config"
import loggerMw from "@server/logger"
import logger from "@server/logger/winston"
import apiRouter from "@server/routes"
import compression from "compression"
import cors from "cors"
import express, { Request, Response } from "express"
import { ValueDeterminingMiddleware, rateLimit } from "express-rate-limit"
import { createServer } from "http"
import mongoose from "mongoose"
import { join } from "path"
import { mw as requestIP } from "request-ip"
import { Server } from "socket.io"
import { initializeSocketIOTest } from "@server/socket/socket"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"


const app = express()
const server = createServer(app)
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: [
            "http://localhost:5173",
            "https://pslv-react-jsx.vercel.app/",
            "https://zt7q67.tunnel.pyjam.as/",
            "http://localhost:80/",
            "http://172.235.25.83:80",
            "http://172.235.25.83:6969",
            "http://172.235.25.83:5173",
            "*"
        ],
        credentials: true
    }
})
const createRateLimit = () => rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: ((req: Request) => req?.clientIp) as ValueDeterminingMiddleware<string>,
    handler: (_, res, ___, options) => {
        const _handler = new ErrorHandler("rate limit")
        return res.status(429).send(_handler.error(
            "Rate Limit Exceeded! " +
            `You are only allowed ${options.limit}/${Math.floor(options.windowMs / 60_000)} minutes`
        ))
    }
})

app.set("io", io)

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://pslv-react-jsx.vercel.app/",
        "https://zt7q67.tunnel.pyjam.as/",
        "http://localhost:80/",
        "http://172.235.25.83:80",
        "http://172.235.25.83:6969",
        "http://172.235.25.83:5173",
        "*"
    ],
    credentials: true
}))
app.use(requestIP())
app.use(createRateLimit())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMw)

app.use("/api", apiRouter)
app.use("/static/files", express.static(join(__dirname, "..", "..", "public")))

app.get("/docker", (_, res) => res.send("This works"))

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:6969",
            },
        ],
        components: {
            securitySchemes: {
                jwt: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                },
            },
        },
    },
    apis: [
        "./src/main/server.ts",
        "./src/server/routes/achievement.ts",
        "./src/server/routes/achievements.ts",
        "./src/server/routes/address.ts",
        "./src/server/routes/admin.ts",
        "./src/server/routes/application.ts",
        "./src/server/routes/applications.ts",
        "./src/server/routes/auth.ts",
        "./src/server/routes/chat.ts",
        "./src/server/routes/companies.ts",
        "./src/server/routes/company.ts",
        "./src/server/routes/connection-request.ts",
        "./src/server/routes/connection.ts",
        "./src/server/routes/connections.ts",
        "./src/server/routes/course.ts",
        "./src/server/routes/education.ts",
        "./src/server/routes/institute.ts",
        "./src/server/routes/institutes.ts",
        "./src/server/routes/interaction.ts",
        "./src/server/routes/job.ts",
        "./src/server/routes/jobs.ts",
        "./src/server/routes/message.ts",
        "./src/server/routes/news.ts",
        "./src/server/routes/post.ts",
        "./src/server/routes/posts.ts",
        "./src/server/routes/profile.ts",
        "./src/server/routes/reported-post.ts",
        "./src/server/routes/reported-user.ts",
        "./src/server/routes/skill.ts",
        "./src/server/routes/skills.ts",
        "./src/server/routes/user.ts",
        "./src/server/routes/users.ts",
        "./src/server/routes/work.ts",
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use((err: Error, _: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


mongoose.connect(DB_URL)
    .then(() => {
        initializeSocketIOTest(io)
        logger.info("Connected to the database")
        server.listen(PORT, () => {
            logger.info(`App listening on port: ${PORT}`)
        })
    })
    .catch(logger.error)
export default app