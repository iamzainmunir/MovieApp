import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import CommentModel from "../model/comments.model"

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

interface IRequest extends Request {
    user: any
}
export default class CommentsCreateController {
    public create = async (req: IRequest, res: Response) => {
        try {
            const commentBody = req.body;
            commentBody.user_id = req.user.user_id;

            const schema = Joi.object().keys({
                comment: Joi.string().required().min(1),
                user_id: Joi.objectId().required(),
                ref_id: Joi.objectId().required()
            });

            const validate: any = schema.validate(req.params);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const add_comment = await CommentModel.create(commentBody)
            return res.status(200).send({ 
                success: true,
                message: "Comment added successfully",
                data: add_comment
            })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
