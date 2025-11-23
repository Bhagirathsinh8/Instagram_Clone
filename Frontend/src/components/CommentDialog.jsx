import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import TempPhoto from "../assets/tempCarphoto.avif";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => {
          setOpen(false);
        }}
        className="max-w-4xl p-0 flex flex-col "
      >
        <div className="flex flex-1 gap-3 ">
          <div className="w-1/2">
            <img
              src={TempPhoto}
              alt="postImg"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>BN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">

                  <Link className="font-semibold text-sm">Bhagirath_nakum_13</Link>
                  <span className="text-gray-600 text-xs">Good</span>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer"/>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="cursor-pointer w-full">
                    Add to Favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr/>
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              All Comments 
              All Comments <br/>
              All Comments 
              All Comments  
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Add Commments..." 
                    className="w-full outline-none border border-gray-300 p-2 rounded"
                  />
                  <Button variant="outline">Send</Button>
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
