import { verifyToken } from "@server/middleware/verify";
import { Router } from "express";

const app = Router()

app.post("/create", verifyToken(), )

export default app