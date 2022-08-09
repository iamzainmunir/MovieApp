import { Request, Response } from 'express';
import errorHandler from '../../../common/handler/error.handler';
const Joi = require('joi').extend(require('@joi/date'));
import fs from "fs";

require('dotenv').config();
const cloudinary = require('cloudinary').v2

export default class FilmUploadImageController {
    public upload = async (req: any, res: Response) => {
        try {

            const uploadImage = await cloudinary.uploader.upload(req.file.path);
            if(uploadImage){
                // After uploading image on cloudinary, delete image from local storage
                fs.unlink("uploads/" + `${req.file.filename}`, (err) => {
                    if (err) {
                      console.log("file couldn't removed")
                    }
                })
            }
            console.log(uploadImage.secure_url)
            return res.status(200).send({ 
                success: true,
                message: "Image uploaded successfully",
                data: {
                    image_url: uploadImage.secure_url
                }
             })
        } catch (error: any) {
            let errorDoc: any = errorHandler(error);
            return res.status(errorDoc.status).send(errorDoc);
        }
    }
}
