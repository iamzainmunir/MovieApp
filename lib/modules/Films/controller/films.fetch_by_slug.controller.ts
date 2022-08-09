import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import FilmModel from "../model/films.model"
import CommentModel from "../../Comments/model/comments.model"
import UserModel from "../../Users/model/user_registration.model"

const Joi = require('joi');

export default class FilmFetchBySlugController {
    public fetchBySlug = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                slug: Joi.string().required()
            });

            const validate: any = schema.validate(req.params);
            if (validate.error) {
                throw {
                    status: 400,
                    message: validate.error.details[0].message.replace(/['"]/g, ''),
                }
            }

            const film: any = await FilmModel.findOne({ slug: validate.value.slug, isDeleted: false })
            if (!film) return res.status(404).send({
                success: false,
                message: "Movie not found"
            })

            // Fetch comments and user info
            const movie_id: any = film._id;
            const comments = await CommentModel.find({ ref: movie_id, isDeleted: false }).sort({ updatedAt: 1 })

            let user_id: any = [];
            comments.forEach((comment: any) => {
                user_id.push(comment.user_id)
            })

            const users = await UserModel.find({ _id: { $in: user_id } }).select({ name: 1, email: 1 });
            let user_info: any = [];
            users.forEach((user: any) => {
                user_info[user._id.toString()] = user;
            })


            let comment_info: any = [];
            comments.forEach((comment: any) => {
                if (!comment_info[comment.ref.toString()]) {
                    comment_info[comment.ref.toString()] = [{
                        comment: comment.comment,
                        date: comment.updatedAt,
                        name: user_info[comment.user_id].name
                    }]
                } else {
                    comment_info[comment.ref.toString()].push({
                        comment: comment.comment,
                        date: comment.updatedAt,
                        name: user_info[comment.user_id].name
                    })
                }
            })

            // Add comments with username with movie
            film._doc.comments = comment_info[movie_id.toString()]

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
