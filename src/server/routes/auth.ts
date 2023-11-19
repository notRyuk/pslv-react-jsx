import UserHandler from "@handlers/user";
import { getKeys, getValues } from "@utils/keys";
import { Router } from "express";

const app = Router()

const handler = new UserHandler()

app.post("/register", async (req, res) => {
    const body = req.body
    const required = [
        "name.first",
        "name.last",
        "dob",
        "email",
        "phone",
        "password",
        "role"
    ]
    const keys = getKeys(body)
    const values = getValues(body)
    for(const req of required) {
        if(
            !keys.includes(req) || 
            (typeof values[keys.indexOf(req)] === "string" && !(values[keys.indexOf(req)] as string).length) 
        ) {
            res.send(handler.error(handler.fieldRequired(req)))
        }
    }

    
})

export default app