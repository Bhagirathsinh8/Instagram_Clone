import mongoose from "mongoose";
import { models } from "../utils/constant.js";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: models.USER,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.USER,
    },
],
comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:models.COMMENT
    }
  ]
},{ timestamps: true });

const Post = mongoose.model("Post",postSchema);
export default Post