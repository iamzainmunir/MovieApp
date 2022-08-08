import * as mongoose from "mongoose";
const Schema = mongoose.Schema,
  MODEL = new Schema({
    comment: { type: String, required: true },
    user_id: { type: String, required: true },
    ref: { type: String,  required: true },
    isDeleted: { type: Boolean, default: false }
  }, { timestamps: true });

export default mongoose.model("comments", MODEL);