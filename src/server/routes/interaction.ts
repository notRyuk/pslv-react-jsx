import InteractionHandler from "@handlers/feed/interaction";
import { verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Interaction from "@server/models/feed/interaction";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new InteractionHandler();

const required = ["post", "user", "type"];

// Create Interaction
app.post("/create", verifyToken(), verifyBody(required), async (_, res) => {
    const { keys, values } = res.locals;
    const interaction = await Interaction.create({
        post: getValue(keys, values, "post"),
        user: getValue(keys, values, "user"),
        type: getValue(keys, values, "type"),
        comment: getValue(keys, values, "comment"),
    });
    if (!interaction) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(interaction));

});

// Retrieve All Interactions
app.get("/", async (_, res) => {
    const interactions = await Interaction.find();
    return res.status(200).send(handler.success(interactions));
});

// Retrieve Interaction by ID
app.get("/:id", async (req, res) => {
    const interactionId = req.params.id;
    const interaction = await Interaction.findById(interactionId);
    if (!interaction) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(interaction));
});

// Update Interaction by ID
app.put("/:id", verifyToken(), verifyBody(required), async (req, res) => {
    const interactionId = req.params.id;
    const { keys, values } = res.locals;
    const interaction = await Interaction.findByIdAndUpdate(
        interactionId,
        {
            post: getValue(keys, values, "post"),
            user: getValue(keys, values, "user"),
            type: getValue(keys, values, "type"),
            comment: getValue(keys, values, "comment"),
        },
        { new: true }
    );
    if (!interaction) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(interaction));
});

// Delete Interaction by ID
app.delete("/:id", verifyToken(), verifyParams(["id"]), async (req, res) => {
    const interactionId = req.params.id;
    const interaction = await Interaction.findByIdAndDelete(interactionId);
    if (!interaction) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(interaction));
});

export default app;
