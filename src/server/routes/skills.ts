import SkillHandler from "@handlers/skill";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Skill from "@server/models/skill";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new SkillHandler();

const required = ["name"];

// Create Skill
app.post("/create", verifyToken(), verifyBody(required), async (req, res) => {
    const { keys, values } = res.locals;

    const skill = await Skill.create({
        name: getValue(keys, values, "name"),
    });

    if (!skill) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }

    return res.status(200).send(handler.success(skill));
});

// Retrieve All Skills
app.get("/", async (req, res) => {
    const skills = await Skill.find();
    return res.status(200).send(handler.success(skills));
});

// Delete Skill by ID
app.delete("/:id", verifyToken(), async (req, res) => {
    const skillId = req.params.id;

    const skill = await Skill.findByIdAndDelete(skillId);

    if (!skill) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }

    return res.status(200).send(handler.success(skill));
});

export default app;
