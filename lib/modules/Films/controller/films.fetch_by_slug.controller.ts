import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import FilmModel from "../model/films.model"

const Joi = require('joi');

export default class FilmFetchBySlugController {
    public fetchBySlug = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                slug: Joi.string().required()
            });

            const validate: any = schema.validate(req.params);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const film = await FilmModel.findOne({ slug: validate.value.slug, isDeleted: false })
            if(!film) return res.status(404).send({ message: "Movie not found" })

            return res.status(200).send({
                success: true,
                message: "Movie fetched successfully",
                data: film
            })
            
        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
