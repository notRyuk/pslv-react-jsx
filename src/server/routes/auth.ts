import UserHandler from "@handlers/user";
import { JWT_SECRET, JWT_SESSION_TIMEOUT } from "@server/config";
import { verifyBody, verifyToken, verifyParams } from "@server/middleware/verify";
import User from "@server/models/user";
import Admin from "@server/models/user/admin";
import Session from "@server/models/user/session";
import IUser, { ProfileRoles } from "@types_/user";
import { downloadFile } from "@utils/file";
import Hash from "@utils/hash";
import { getValue } from "@utils/object";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";
import Multer from "multer";

const app = Router()
const multer = Multer()

const handler = new UserHandler()

const registerFields = [
    "name.first",
    "name.last",
    "dob",
    "email",
    "phone",
    "password",
    "role"
]

/**
<<<<<<< HEAD
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: object
 *                 properties:
 *                   first:
 *                     type: string
 *                   last:
 *                     type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["institute", "user"]
 *     responses:
 *       '200':
 *         description: Successful registration
 *       '401':
 *         description: Error during registration
 */
=======
* @swagger
* /api/auth/register:
*   post:
*     summary: User registration
*     description: Register a new user.
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: object
*                 properties:
*                   first:
*                     type: string
*                   last:
*                     type: string
*               dob:
*                 type: string
*                 format: date
*               email:
*                 type: string
*                 format: email
*               phone:
*                 type: string
*               password:
*                 type: string
*               role:
*                 type: string
*     responses:
*       '200':
*         description: User registered successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserSession'
*       '401':
*         description: Error occurred during registration
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*     security: []
* components:
*   schemas:
*     UserSession:
*       type: object
*       properties:
*         user:
*           type: string
*           description: The unique identifier of the registered user.
*         token:
*           type: string
*           description: JWT token for the registered user's session.
*     Error:
*       type: object
*       properties:
*         message:
*           type: string
*           description: Description of the error occurred during registration.
*/
>>>>>>> 05b286b1649750a8783a34ebb41d68343d44afc4

app.post("/register", multer.single("profilePhoto"), verifyBody(registerFields, handler), async (req, res) => {
    const { keys, values } = res.locals
    let user = new User({
        name: {
            first: getValue(keys, values, "name.first"),
            last: getValue(keys, values, "name.last")
        },
        dob: getValue(keys, values, "dob"),
        email: getValue(keys, values, "email"),
        phone: getValue(keys, values, "phone"),
        password: getValue(keys, values, "password") as string,
        role: getValue(keys, values, "role") === "institute" ? ProfileRoles.admin : getValue(keys, values, "role"),
        ...(keys.includes("bio") && getValue(keys, values, "bio").length && {
            bio: getValue(keys, values, "bio")
        })
    } as IUser)
    try {
        await user.validate()
        if (req.file && ["image/png", "image/jpeg"].includes(req.file.mimetype)) {
            const file = req.file
            const profilePhoto = await downloadFile("profilePhoto." + file.originalname.split(".").pop(), user._id.toString(), file.buffer)
            if (profilePhoto) {
                user.profilePhoto = profilePhoto
            }
        }
        let admin = null
        if (getValue(keys, values, "role") === "institute") {
            admin = await Admin.create({
                role: getValue(keys, values, "role"),
                createdBy: "656de3f2bdcaade9d49d0f4b"
            })
            if (!admin) {
                return res.status(404).send(handler.error(handler.STATUS_404))
            }
            user.set("admin", admin._id)
        }
        user = await user.save()
        const token = jwt.sign({
            user: user._id.toString(),
            createdAt: Date.now()
        }, JWT_SECRET, { expiresIn: JWT_SESSION_TIMEOUT })
        const session = await Session.create({ user: user._id, token })
        user.admin = admin
        session.user = user
        return res.status(200).send(handler.success(session))
    }
    catch (err: MongooseError | any) {
        return res.status(401).send(handler.error(err.message))
    }
})

// app.post("/register/institute")

<<<<<<< HEAD
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Endpoint to authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Incorrect email or password
 *       '404':
 *         description: User not found
 */
=======

/**
* @swagger
* /api/auth/login:
*   post:
*     summary: User login
*     description: Authenticate user and generate session token.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 format: email
*               password:
*                 type: string
*     responses:
*       '200':
*         description: User logged in successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/UserSession'
*       '401':
*         description: Invalid email or password
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*     security: []
* components:
*   schemas:
*     UserSession:
*       type: object
*       properties:
*         user:
*           type: string
*           description: The unique identifier of the logged-in user.
*         token:
*           type: string
*           description: JWT token for the user's session.
*     Error:
*       type: object
*       properties:
*         message:
*           type: string
*           description: Description of the error occurred during login.
*/

>>>>>>> 05b286b1649750a8783a34ebb41d68343d44afc4
app.post("/login", verifyBody(["email", "password"], handler), async (_, res) => {
    const { keys, values } = res.locals
    const user = await User.findOne({ email: getValue(keys, values, "email") }).populate("admin")
    if (!user) {
        return res.status(404).send(handler.error(handler.STATUS_404))
    }
    if (!Hash.simpleCompare(getValue(keys, values, "password") as string, user.password)) {
        return res.status(401).send(handler.error("Incorrect password, try again."))
    }
    const token = jwt.sign({
        user: user._id.toString(),
        createdAt: Date.now()
    }, JWT_SECRET, { expiresIn: JWT_SESSION_TIMEOUT })
    const session = await Session.create({ user: user._id, token })
    session.user = user
    return res.status(200).send(handler.success(session))
})

app.post("/verify", verifyToken(handler), (_, res) => {
    return res.status(200).send(handler.success(res.locals.session))
})

/**
<<<<<<< HEAD
 * @swagger
 * /api/auth/get-user/:email:
 *   get:
 *     summary: Get a user by email
 *     description: Endpoint to get a user by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to retrieve
 *     responses:
 *       '200':
 *         description: Successful retrieval of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized access
 * 
 *   components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user.
 *         name:
 *           type: object
 *           properties:
 *             first:
 *               type: string
 *             last:
 *               type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 */
=======
* @swagger
* /api/auth/get-user/{email}:
*   get:
*     summary: Get user by email
*     description: Retrieve user information by email.
*     parameters:
*       - in: path
*         name: email
*         required: true
*         schema:
*           type: string
*         description: Email address of the user to retrieve.
*     responses:
*       '200':
*         description: User information retrieved successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       '404':
*         description: User not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*     security: []
* components:
*   schemas:
*     User:
*       type: object
*       properties:
*         _id:
*           type: string
*           description: The unique identifier of the user.
*         email:
*           type: string
*           format: email
*           description: The email address of the user.
*     Error:
*       type: object
*       properties:
*         message:
*           type: string
*           description: Description of the error occurred when user is not found.
*/

>>>>>>> 05b286b1649750a8783a34ebb41d68343d44afc4

app.get("/get-user/:email", verifyParams(["email"]), async (_, res) => {
    const { keys, values } = res.locals
    const user = await User.findOne({ email: getValue(keys, values, "email") });
    // if (!user) {
    //     return res.status(404).send(handler.error('User not found'));
    // }
    return res.status(200).send(handler.success(user || {}));
})

export default app