import { Router } from 'express';
import User from '@server/models/user/index';
import { verifyToken } from '@server/middleware/verify';
import UserHandler from '@handlers/user';

const app = Router();
const handler = new UserHandler();

app.get('/get-all', verifyToken(), async (_, res) => {
    console.log("hello");
    
    const users = await User.find();
    console.log(users.length);
    
    if(!users){
        return res.status(404).json(handler.error(handler.STATUS_404))
    }
    return res.status(200).json(handler.success(users));
});

export default app;
