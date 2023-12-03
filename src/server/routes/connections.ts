import ConnectionHandler from "@handlers/user/connection";
import { verifyParams, verifyToken } from "@server/middleware/verify";
import Connection from "@server/models/user/connection";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new ConnectionHandler()

app.get("/:user", verifyToken(), verifyParams(["user"]), async (_, res) => {
    const { keys, values } = res.locals
    const connections = await Connection.find({ users: getValue(keys, values, "user" )}) || []
    return res.status(200).send(handler.success(connections))
})

export default app