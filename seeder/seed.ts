import UserModel from "../lib/modules/Users/model/user_registration.model"
import FilmModel from "../lib/modules/Films/model/films.model"
import CommentModel from "../lib/modules/Comments/model/comments.model"

import dotenv from "dotenv";
const path = require('path');
const bcrypt = require('bcryptjs');
import mongoose from "mongoose";

import DUMMY_DATA from "./DUMMY_DATA.json";

// Initialize dotenv
if (process.env.NODE_ENV === 'production') {
    console.log("Production server is running");
    dotenv.config({ path: path.join(__dirname, "../.env.production") });
} else {
    dotenv.config();
}

(async function () {
    const DB: any = process.env.DATABASE;
    // Added check to drop and seed data in development env only
    if (process.env.NODE_ENV !== "production") {
        console.log("*** Dropping Collections ***")
        mongoose.connect(DB, function () {
            /* Drop the DB */
            mongoose.connection.db.dropDatabase().then(async () => {
                console.log("*** Seeding Dummy Data ***")
                
                let movie_list = [];
                const user = DUMMY_DATA.user;
                const hashedPassword = bcrypt.hashSync(user.password, 8);
                user.password = hashedPassword;
                const new_user = await UserModel.create(user);
                
                for (let index = 0; index < DUMMY_DATA.movies.length; index++) {
                    const movie = await FilmModel.create(DUMMY_DATA.movies[index]);
                    movie_list.push(movie);
                }

                for (let movie_index = 0; movie_index < movie_list.length; movie_index++) {
                    const movie_id = movie_list[movie_index]._id
                    const user_id = new_user._id;

                    const comment = {
                        user_id: user_id,
                        ref: movie_id,
                        comment: DUMMY_DATA.comments[movie_index].comment
                    }
                    await CommentModel.create(comment)
                }
                console.log("*** Data Seeded Successfully ***")
            })
        });
    }
})();