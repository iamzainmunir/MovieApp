import * as mongoose from "mongoose";
const Schema = mongoose.Schema,
  MODEL = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
    country: { type: String,  required: true },
    genre: [{ type: String,  required: true }],
    photo: { type: String,  required: true },
    slug: { type: String,  required: true },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });

export default mongoose.model("films", MODEL);