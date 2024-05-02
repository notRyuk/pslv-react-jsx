import { Router } from 'express';
import User from '@server/models/user/index';
import { verifyAdmin, verifyParams, verifyToken } from '@server/middleware/verify';
import UserHandler from '@handlers/user';
import { getValue } from '@utils/object';
import IUser from '@types_/user';
import IAdmin from '@types_/user/admin';
import Profile from '@server/models/user/profile';
import Education from '@server/models/user/education';
// import { createClient } from "@vercel/kv";

const app = Router();
const handler = new UserHandler();

app.get('/get-all', verifyToken(), async (_, res) => {    


    // const kv = createClient({
    //     url: process.env.KV_REST_API_URL,
    //     token: process.env.KV_REST_API_TOKEN,
    // });

    // const allUsers = await kv.hgetall("allUsers");

    // if (allUsers) {
    //     console.log("This is the recieved data " + allUsers);
    // } else {
    //     // const newUser = await kv.hset("user:me", set);
    //     console.log("no data");
    // }
    // await kv.del('user:me');

    const users = await User.find();
    if(!users){
        return res.status(404).json(handler.error(handler.STATUS_404))
    }
    return res.status(200).json(handler.success(users));
});

app.get('/get-role/:role', verifyToken(), verifyParams(["role"]), async(_, res)=>{
    const { keys, values, session } = res.locals

    const role = getValue(keys, values, "role");
    if(role === "all"){
        const users = await User.find({ _id: { $ne: (session.user as IUser)._id } });
        if (!users) {
            return res.status(404).json(handler.error(handler.STATUS_404))
        }
        return res.status(200).json(handler.success(users));
    }
    const users = await User.find({ _id: { $ne: (session.user as IUser)._id }, role: role });
    if (!users) {
        return res.status(404).json(handler.error(handler.STATUS_404))
    }
    return res.status(200).json(handler.success(users));
})

app.get('/get-by-instituteId', verifyToken(), verifyAdmin(), async(_, res)=>{
    const {session} = res.locals
    const admin = ((session.user as IUser)?.admin) as IAdmin;
    // console.log(admin);
    
    const instituteId = admin?.institute
    const education = await Education.find({'institute' : instituteId})
    const profiles = await Profile.find({ 'education': { $in: education.map(edu => edu._id) } });
    const userIds = profiles.map(profile => profile._id);
    const users = await User.find({ 'profile': { $in: userIds } });

    if (!users) {
        return res.status(404).json(handler.error(handler.STATUS_404))
    }
    return res.status(200).json(handler.success(users));
})

export default app;
