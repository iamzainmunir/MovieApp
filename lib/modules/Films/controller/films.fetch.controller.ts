import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
import FilmModel from "../model/films.model"
import CommentModel from "../../Comments/model/comments.model"
import UserModel from "../../Users/model/user_registration.model"

const Joi = require('joi');

export default class FilmFetchController {
    public fetch = async (req: Request, res: Response) => {
        try {
            const schema = Joi.object().keys({
                page: Joi.string().optional(),
                limit: Joi.string().optional(),
            });

            const validate: any = schema.validate(req.query);
            if (validate.error) {
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

            const film_list: any = await FilmModel.find({ isDeleted: false }, {}, pagination)
            const count = await FilmModel.countDocuments({ isDeleted: false })

            // Fetch comments and user info
            let movie_id: any = [];
            film_list.forEach((movie: any) => {
                movie_id.push(movie._id.toString())
            })
            const comments = await CommentModel.find({ ref: { $in: movie_id }, isDeleted: false }).sort({ updatedAt: 1 })

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
                        name: user_info[comment.user_id].name
                    })
                }
            })

            // Add comments with username with there related movies
            film_list.forEach((movie: any, index: any) => {
                film_list[index]._doc.comments = comment_info[movie._id.toString()]
            })

            return res.status(200).send({
                success: true,
                count: count,
                page: page,
                limit: limit,
                message: "Movie list fetched successfully",
                list: film_list
            })

        } catch (error) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
