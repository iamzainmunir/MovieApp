import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
const Joi = require('joi');

export default class CommentsDeleteController {
    public delete = async (req: Request, res: Response) => {
        try {
            return res.status(200).send({ message: "Delete" })
        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
