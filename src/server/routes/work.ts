import WorkHandler from "@handlers/job/work";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Work from "@server/models/job/work";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new WorkHandler();

const required = ["company", "from", "isCurrent"];

// Create Work
app.post("/create", verifyToken(), verifyBody(required), async (req, res) => {
    const { keys, values } = res.locals;

    const work = await Work.create({
        company: getValue(keys, values, "company"),
        from: getValue(keys, values, "from"),
        isCurrent: getValue(keys, values, "isCurrent"),
        to: getValue(keys, values, "to"),
    });

    if (!work) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }

    return res.status(200).send(handler.success(work));
});

// Retrieve All Works
app.get("/", async (req, res) => {
    const works = await Work.find();
    return res.status(200).send(handler.success(works));

});

// Update Work by ID
app.put("/:id", verifyToken(), verifyBody(required), async (req, res) => {
    const workId = req.params.id;
    const { keys, values } = res.locals;
    const work = await Work.findByIdAndUpdate(
        workId,
        {
            company: getValue(keys, values, "company"),
            from: getValue(keys, values, "from"),
            isCurrent: getValue(keys, values, "isCurrent"),
            to: getValue(keys, values, "to"),
        },
        { new: true }
    );

    if (!work) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }

    return res.status(200).send(handler.success(work));
});

// Delete Work by ID
app.delete("/:id", verifyToken(), async (req, res) => {
    const workId = req.params.id;

    const work = await Work.findByIdAndDelete(workId);

    if (!work) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }

    return res.status(200).send(handler.success(work));
});



export default app;
