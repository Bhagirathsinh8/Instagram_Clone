import mongoose from 'mongoose';
import { models } from "../utils/constant.js";

const messageSchema = new mongoose.Schema({
    senderId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:models.USER,   
    },
    receiverId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:models.USER,   
    },
    message:{
        type:String,
        required:true
    },
},{ timestamps: true });

const Message = mongoose.model(models.MESSAGE,messageSchema);
export default Message;