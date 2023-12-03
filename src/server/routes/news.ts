import NewsHandler from "@handlers/feed/news";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import News from "@server/models/feed/news";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new NewsHandler();

const required = ["title"];

// Create News
app.post("/create", verifyToken(), verifyBody(required), async (req, res) => {
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

// Retrieve All News
app.get("/", async (req, res) => {
    const newsList = await News.find();
    return res.status(200).send(handler.success(newsList));
});

// Retrieve News by ID
app.get("/:id", async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

// Update News by ID
app.put("/:id", verifyToken(), verifyBody(required), async (req, res) => {
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

// Delete News by ID
app.delete("/:id", verifyToken(), verifyParams(["id"]), async (req, res) => {
    const newsId = req.params.id;
    const news = await News.findByIdAndDelete(newsId);
    if (!news) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(news));
});

export default app;
