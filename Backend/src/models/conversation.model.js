import mongoose from "mongoose";
import { models } from "../utils/constant.js";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.USER,
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: models.MESSAGE,
      },
    ],
},{ timestamps: true }
);

const Conversation = mongoose.model(models.CONVERSATION, conversationSchema);
export default Conversation;
