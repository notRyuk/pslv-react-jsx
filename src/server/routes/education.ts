import EducationHandler from "@handlers/user/education";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Education from "@server/models/user/education";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router();
const handler = new EducationHandler();


app.post(
    "/create",
    verifyToken(),
    verifyBody(["institute", "type", "joined", "completion.isCurrent", ]),
    async (_, res) => {
        const { keys, values } = res.locals;
        const education = await Education.create({
            institute: getValue(keys, values, "institute"),
            type: getValue(keys, values, "type"),
            joined: getValue(keys, values, "joined"),
            completion: {
                isCurrent: getValue(keys, values, "completion.isCurrent")
            },
            remarks: getValue(keys, values, "remarks")
        });
        if (!education)      
            return res.status(404).json(handler.error(handler.STATUS_404));
        return res.status(201).json(handler.success(education))
        
    }
);


export default app;