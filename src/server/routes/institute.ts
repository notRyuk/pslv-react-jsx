import InstituteHandler from "@handlers/institute";
import { verifyAdmin, verifyBody, verifyParams, verifyToken } from "@server/middleware/verify";
import Address from "@server/models/address";
import Institute from "@server/models/institute";
import Admin from "@server/models/user/admin";
import IUser from "@types_/user";
import IAdmin from "@types_/user/admin";
import { getValue } from "@utils/object";
import { Router } from "express";

const app = Router()
const handler = new InstituteHandler()

const required = [
    "name",
]

/**
 * @swagger
 * /institute/create:
 *   post:
 *     summary: Create an institute
 *     description: Endpoint to create a new institute
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 $ref: '#/components/schemas/Address'
 *               contact:
 *                 type: string
 *               faculty:
 *                 type: array
 *                 items:
 *                   type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Institute created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institute'
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Failed to create institute or admin not found
 */

app.post("/create",
    verifyToken(),
    verifyAdmin(),
    verifyBody(required),
    async (req, res) => {
        const { keys, values, session } = res.locals
        const user = session.user as IUser
        const address = await Address.create(req.body.address)
        if (!address) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        const institute = await Institute.create({
            name: getValue(keys, values, "name"),
            contact: req.body.contact,
            admin: user._id,
            address: address._id,
            ...(keys.includes("faculty") && {
                faculty: getValue(keys, values, "faculty")
            }),
            ...(keys.includes("courses") && {
                courses: getValue(keys, values, "courses")
            }),
            ...(keys.includes("awards") && {
                awards: getValue(keys, values, "awards")
            })
        })
        if (!institute) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        const admin = await Admin.findByIdAndUpdate((user.admin as IAdmin)?._id, { $set: { institute: institute._id } })
        if(!admin) {
            return res.status(404).send(handler.error(handler.STATUS_404))
        }
        return res.status(200).send(handler.success(institute))
    }
)


/**
 * @swagger
 * /institute/:id:
 *   delete:
 *     summary: Delete an institute
 *     description: Endpoint to delete an institute by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the institute to delete
 *     responses:
 *       '200':
 *         description: Institute deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institute'
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Institute not found
 */

app.delete("/:id", verifyToken(), verifyAdmin(), verifyParams(["id"]), async (_, res) => {
    const { keys, values } = res.locals;
    const institute = await Institute.findByIdAndDelete(getValue(keys, values, "id"));
    if (!institute) {
        return res.status(404).send(handler.error(handler.STATUS_404));
    }
    return res.status(200).send(handler.success(institute));
});

export default app