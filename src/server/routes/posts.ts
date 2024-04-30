import PostHandler from "@handlers/feed/post";
import { verifyParams, verifyToken } from "@server/middleware/verify";
import Post from "@server/models/feed/post";
import { getValue } from "@utils/object";
import { Router } from "express";
import { createClient } from "@vercel/kv";

const app = Router()
const handler = new PostHandler()

app.get("/", verifyToken(), async (_, res) => {
    const kv = createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
    });

    const posts = await kv.hgetall("allPosts");

    if(posts){
        
    }

    const allPosts = await Post.find().populate({ path: "user", select: "-password" }).exec();
    return res.status(200).send(handler.success(allPosts));
});

app.get("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const posts = await Post.find({ user: getValue(keys, values, "id") }).populate({ path: "user", select: "-password" }).exec();
    return res.status(200).send(handler.success(posts || []))
})
app.get("/get-by-postId/:id", verifyToken(), verifyParams(["id"]), async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({
            _id: postId
        }).populate("user institute").populate("content");
        
        if (!post) {
            return res.status(404).send("Post not found");
        }

        return res.status(200).send(handler.success(post));
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).send("Internal Server Error");
    }
});

export default app