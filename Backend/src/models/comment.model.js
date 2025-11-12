import mongoose from "mongoose";
import { models } from "../utils/constant.js";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: models.USER,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: models.POST,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model(models.COMMENT, commentSchema);
export default Comment;
