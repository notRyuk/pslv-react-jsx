import { Router } from 'express';
import User from '@server/models/user/index';
import { verifyParams, verifyToken } from '@server/middleware/verify';
import UserHandler from '@handlers/user';
import { getValue } from '@utils/object';
import IUser from '@types_/user';

const app = Router();
const handler = new UserHandler();

app.get('/get-all', verifyToken(), async (_, res) => {    
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

export default app;
