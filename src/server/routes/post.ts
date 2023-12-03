import PostHandler from "@handlers/feed/post";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify"
import Post from "@server/models/feed/post";
import IUser from "@types_/user";
import { downloadFile } from "@utils/file";
import Hash from "@utils/hash";
import { getValue } from "@utils/object";
import { Router } from "express"
import Multer from "multer";

const app = Router()
const multer = Multer()
const handler = new PostHandler()

const required = ["content.text"]
app.post("/create", verifyToken(), multer.array("content.media"), verifyBody(required), async (req, res) => {
    const { keys, values, session } = res.locals;
    const user = (session.user as IUser)._id.toString()
    const files = req.files as Express.Multer.File[]
    const fileUrls: string[] = []
    for(const file of files) {
        const originalName = file.originalname.split(".")
        const mimeType = originalName.pop()
        const fileName = Hash.create(user+"--"+originalName.join(".")).replace(/\//g, "--")
        const url = await downloadFile(`${fileName}.${mimeType}`, user, file.buffer)
        if(url && url.length) {
            fileUrls.push(url)
        }
    }
    const post = await Post.create({
        user,
        content: {
            text: getValue(keys, values, "content.text"),
            media: fileUrls
        }
    })
    if(!post) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    res.status(200).send(handler.success(post))
})

app.delete("/:id", verifyToken(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const post = await Post.findByIdAndDelete(getValue(keys, values, "id"))
    if (!post) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(post))
})

export default app