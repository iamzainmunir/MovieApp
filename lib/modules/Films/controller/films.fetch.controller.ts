import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import FilmModel from "../model/films.model"

const Joi = require('joi');

export default class FilmFetchController {
    public fetch = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                page: Joi.string().optional(),
                limit: Joi.string().optional(),
            });

            const validate: any = schema.validate(req.query);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            let page = Number(validate.value.page ? validate.value.page : 1),
            limit = Number(validate.value.limit ? validate.value.limit : 1);
            let skip = (page * limit) - limit;
            validate.value.page = page;

            const pagination = {
                sort: { name: 1 },
                skip: skip < 0 ? 0 : skip,
                limit: limit
            };

            const film_list = await FilmModel.find({ isDeleted: false }, {}, pagination)
            const count = await FilmModel.countDocuments({ isDeleted: false })

            return res.status(200).send({ 
                success: true,
                count: count,
                page: page,
                limit: limit,
                list: film_list
             })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
