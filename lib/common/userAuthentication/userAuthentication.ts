const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { UserService } from "../../modules/Users/services/user.services";
import errorHandler from '../handler/error.handler';
import mongoose from "mongoose";

interface IRequest extends Request {
    user: any
}

export default async (req: IRequest, res: Response, next: any) => {
    try {
        const token: any = req.headers['x-access-token'];
        if (!token) {
            throw {
                status: 401,
                message: 'No token provided.'
            }
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        //Verify if decoded userId is valid userId
        const user: any = new UserService();
        const getUser: any = await user.fetchUser({ _id: new mongoose.Types.ObjectId(decoded.uid) });
        if (!(getUser.success)) throw getUser

        req.user = {
            user_id: getUser.data._id.toString(),
            email: getUser.data.email,
            displayName: getUser.data.displayName
        };

        next();

    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            error.message = 'Authentication failed'
        }

        let errorDoc = errorHandler(error);
        return res.status(errorDoc.status).send(errorDoc);
    }
}
