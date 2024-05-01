import AddressHandler from "@handlers/address";
import { verifyBody, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new AddressHandler()

const required = ["line1", "street", "city", "state", "pinCode"]

/**
* @swagger
* /api/address/create:
*   post:
*     summary: Create address
*     description: Create a new address.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 description: The name associated with the address (optional).
*               buildingName:
*                 type: string
*                 description: The name of the building associated with the address (optional).
*               line1:
*                 type: string
*                 description: The first line of the address.
*               line2:
*                 type: string
*                 description: The second line of the address (optional).
*               street:
*                 type: string
*                 description: The street name of the address.
*               landmark:
*                 type: string
*                 description: The landmark associated with the address (optional).
*               city:
*                 type: string
*                 description: The city of the address.
*               state:
*                 type: string
*                 description: The state of the address.
*               pinCode:
*                 type: string
*                 description: The pin code of the address.
*     responses:
*       '200':
*         description: Address created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Address'
*       '404':
*         description: Address creation failed
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*     security:
*       - bearerAuth: []
* components:
*   schemas:
*     Address:
*       type: object
*       properties:
*         _id:
*           type: string
*           description: The unique identifier of the address.
*         name:
*           type: string
*           description: The name associated with the address.
*         buildingName:
*           type: string
*           description: The name of the building associated with the address.
*         line1:
*           type: string
*           description: The first line of the address.
*         line2:
*           type: string
*           description: The second line of the address.
*         street:
*           type: string
*           description: The street name of the address.
*         landmark:
*           type: string
*           description: The landmark associated with the address.
*         city:
*           type: string
*           description: The city of the address.
*         state:
*           type: string
*           description: The state of the address.
*         pinCode:
*           type: string
*           description: The pin code of the address.
*     Error:
*       type: object
*       properties:
*         message:
*           type: string
*           description: Description of any error that occurred during address creation.
*/

app.post("/create", verifyToken(), verifyBody(required), async (_, res) => {
    const { keys, values } = res.locals
    const address = await Address.create({
        ...(keys.includes("name") && {
            name: getValue(keys, values, "name")
        }),
        ...(keys.includes("buildingName") && {
            buildingName: getValue(keys, values, "buildingName")
        }),
        line1: getValue(keys, values, "line1"),
        ...(keys.includes("line2") && {
            line2: getValue(keys, values, "line2")
        }),
        street: getValue(keys, values, "street"),
        ...(keys.includes("landmark") && {
            landmark: getValue(keys, values, "landmark")
        }),
        city: getValue(keys, values, "city"),
        state: getValue(keys, values, "state"),
        pinCode: getValue(keys, values, "pinCode")
    })
    if(!address) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    return res.status(200).send(handler.success(address))
})

export default app