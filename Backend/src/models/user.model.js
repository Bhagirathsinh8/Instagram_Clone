import mongoose from "mongoose";
import { models } from "../utils/constant.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.USER,
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.USER,
    },
  ],
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:models.POST
  }],
  bookmarks:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:models.BOOKMARKS
    }
  ]
}, { timestamps: true })


const User = mongoose.model(models.USER, userSchema);
export default User;
