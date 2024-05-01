if (__filename.endsWith(".js")) {
  require("module-alias/register");
  const { addAliases } = require("module-alias");
  addAliases({
    "@*": `build/src/*`,
  });
}

import { ErrorHandler } from "@handlers/error";
import { DB_URL, PORT } from "@server/config";
import loggerMw from "@server/logger";
import logger from "@server/logger/winston";
import apiRouter from "@server/routes";
import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { ValueDeterminingMiddleware, rateLimit } from "express-rate-limit";
import { createServer } from "http";
import mongoose from "mongoose";
import { join } from "path";
import { mw as requestIP } from "request-ip";
import { Server } from "socket.io";
import { initializeSocketIOTest } from "@server/socket/socket";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

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
    "./src/server/routes/achievements.ts",
    "./src/server/routes/auth.ts",
    "./src/server/routes/companies.ts",
    "./src/server/routes/address.ts",
    "./src/server/routes/posts.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


const createRateLimit = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5000,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: ((req: Request) =>
      req?.clientIp) as ValueDeterminingMiddleware<string>,
    handler: (_, res, ___, options) => {
      const _handler = new ErrorHandler("rate limit");
      return res
        .status(429)
        .send(
          _handler.error(
            "Rate Limit Exceeded! " +
              `You are only allowed ${options.limit}/${Math.floor(
                options.windowMs / 60_000
              )} minutes`
          )
        );
    },
  });

app.set("io", io);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(requestIP());
app.use(createRateLimit());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMw);


app.use("/api", apiRouter);
app.use("/static/files", express.static(join(__dirname, "..", "..", "public")));

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

mongoose
  .connect(DB_URL)
  .then(() => {
    initializeSocketIOTest(io);
    logger.info("Connected to the database");
    server.listen(PORT, () => {
      logger.info(`App listening on port: ${PORT}`);
    });
  })
  .catch(logger.error);
