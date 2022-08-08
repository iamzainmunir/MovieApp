import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import FilmModel from "../model/films.model"
const Joi = require('joi').extend(require('@joi/date'));
const slugify = require('slugify')

export default class FilmCreateController {
    public create = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                name: Joi.string().regex(/^[a-zA-Z0-9'][a-zA-Z0-9' ]+$/).min(4).max(80).required().messages({
                    "string.min": "Must have at least 4 characters",
                    "object.regex": "Movie name must not conatain any special characters",
                }),
                description: Joi.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9 ]+$/).min(4).max(30).required().messages({
                    "string.min": "Must have at least 4 characters",
                    "object.regex": "Movie description must not conatain any special characters",
                }),
                releaseDate: Joi.date().format('YYYY-MM-DD').required(),
                rating: Joi.number().min(1).max(5).required(),
                ticketPrice: Joi.number().min(1).required(),
                country: Joi.string().regex(/^[a-zA-Z][a-zA-Z ]+$/).min(4).max(30).required().messages({
                    "string.min": "Must have at least 4 characters",
                    "object.regex": "Country name must be alphabetic",
                }),
                genre: Joi.array().items(Joi.string()),
                photo: Joi.string().required()
            });

            const validate: any = schema.validate(req.body);
            if(validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            
            const slug = slugify(validate.value.name, { lower: true })
            validate.value.slug = slug;

            const film = await FilmModel.findOne({ slug: slug })
            if(film){
                return res.status(403).send({
                    message: "Film with provided name already exists"
                })
            }
            
            const add_film = await FilmModel.create(validate.value)

            return res.status(200).send({
                success: true,
                data: add_film
            })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
