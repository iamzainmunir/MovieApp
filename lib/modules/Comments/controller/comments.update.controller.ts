import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
const Joi = require('joi');

export default class CommentsUpdateController {
    public update = async (req: Request, res: Response) => {
        try {
            return res.status(200).send({ message: "Update" })
        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
