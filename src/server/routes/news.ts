import NewsHandler from "@handlers/feed/news";
import { verifyAdmin, verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import News from "@server/models/feed/news";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new NewsHandler();

const required = ["title"];

// Create News
app.post("/create", verifyToken(), verifyAdmin(), verifyBody(required), async (_, res) => {
    const { keys, values } = res.locals;
    const news = await News.create({
        title: getValue(keys, values, "title"),
        description: getValue(keys, values, "description"),
    });
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

app.get("/", verifyToken(), async (_, res) => {
    const newsList = await News.find();
    return res.status(200).send(handler.success(newsList));
});

app.get("/:id", verifyToken(), async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

app.put("/:id", verifyToken(), verifyAdmin(), verifyBody(required), async (req, res) => {
    const newsId = req.params.id;
    const { keys, values } = res.locals;
    const news = await News.findByIdAndUpdate(
        newsId,
        {
            title: getValue(keys, values, "title"),
            description: getValue(keys, values, "description"),
        },
        { new: true }
    );
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

app.delete("/:id", verifyToken(), verifyAdmin(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals
    const news = await News.findByIdAndDelete(getValue(keys, values, "id"));
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

export default app;
