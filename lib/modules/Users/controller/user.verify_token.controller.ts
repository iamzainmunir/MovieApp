import { UserService } from "../services/user.services"
import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

interface IRequest extends Request {
    user: any
}

export default class UserVerifyToken {
    public verify = async (req: IRequest, res: Response) => {
        try {
            if (!req.user) {
                return res.status(403).send({
                    success: false,
                    message: "Invalid token. Please login again!"
                });
            }

            return res.status(200).send({
                message: "Token verified successfully",
                success: true
            })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
