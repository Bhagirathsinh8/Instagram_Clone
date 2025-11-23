import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import TempPhoto from '../assets/tempCarphoto.avif'
import CommentDialog from "./CommentDialog";

const Post = () => {
  const [text,setText] =useState("");
  const [open,setOpen] =useState(false);

  const changeEventHandler = (e) =>{
    const inputText = e.target.value;

    if(inputText.trim()){
      setText(inputText);
    } else{
      setText("")
    }
  }

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_avimage" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <h1>Username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ed4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to Favourites
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ed4956] font-bold"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-md my-2 w-full aspect-square object-cover"
        src={TempPhoto}
        // src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="postImage"
      />

      
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <FaRegHeart size={"22px"} className="cursor-pointer hover:text-gray-600"/>
            <MessageCircle onClick={()=>{setOpen(true)}} className="cursor-pointer hover:text-gray-600" />
            <Send className="cursor-pointer hover:text-gray-600" />
          </div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
        <span className="font-normal block mb-2 ">200 likes</span>
        <p>
          <span className="font-medium mr-2">username</span>
            caption
        </p>
        <span onClick={()=>{setOpen(true)}} className="cursor-pointer text-sm text-gray-400">view all 10 Comments</span>
        <CommentDialog open={open} setOpen={setOpen}/>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={changeEventHandler}
            className="outline-none text-sm w-full"
          />
          {
            text && <span className="text-[#3BADF8]">Post</span>
          }
          
        </div>
    </div>
  );
};

export default Post;
