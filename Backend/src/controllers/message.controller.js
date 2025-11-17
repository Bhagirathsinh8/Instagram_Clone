import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

//For Chating

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    // Find the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation → create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Push message into conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

     //Implement Socket IO for Realtime Data Transfer

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMessge = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    }).populate('messages').lean();

    if(!conversation){
        return res.status(200).json({
            status:1,
            success:true,
            message:[]
        });    
    }
     return res.status(200).json({
            status:1,
            success:true,
            message:"Get Messages Successfully",
            data:conversation?.messages
        });    

  } catch (error) {
    console.log(error);
  }
};
