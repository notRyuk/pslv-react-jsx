import PostHandler from "@handlers/feed/post";
import { verifyParams, verifyToken } from "@server/middleware/verify";
import Post from "@server/models/feed/post";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new PostHandler()

app.get("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const posts = await Post.find({ user: getValue(keys, values, "id") })
    return res.status(200).send(handler.success(posts || []))
})

export default app