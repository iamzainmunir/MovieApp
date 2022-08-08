import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
const Joi = require('joi').extend(require('@joi/date'));

export default class FilmUploadImageController {
    public upload = async (req: Request, res: Response) => {
        try {





            return res.status(200).send({ message: "Upload" })
        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
