import fs from "fs";
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      if (!fs.existsSync("uploads/")){
        fs.mkdirSync("uploads/")
      }
        cb(null, "uploads/")
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {
    if (file && (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png")) {
        cb(null, true)
    } else {
        cb("Image must be in jpeg, jpg or png format", false)
    }
}


export default function (req: any, res: any, next: any) {
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5 //5mb
        },
        fileFilter: fileFilter    
    }).single("photo");

    upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            next(err)
        } else if (err) {
            // An unknown error occurred when uploading.
            next(err)
        }
        // Everything went fine. 
        next()
    })
}