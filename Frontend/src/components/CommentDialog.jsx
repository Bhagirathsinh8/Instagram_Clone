import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import Posts from "./Posts";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { ROUTES } from "@/utils/constant";

const CommentDialog = ({ open, setOpen }) => {

  const [text,setText] =useState("");
  const {selectedPost,posts} = useSelector(store => store.post);
  const {user} = useSelector(store => store.auth);
  const [comment,setComment] = useState([]);;
  const dispatch = useDispatch();

    useEffect(() => {
    if (selectedPost) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);


    const changeEventHandler = (e) =>{
    const inputText = e.target.value;

    if(inputText.trim()){
      setText(inputText);
    } else{
      setText("")
    }
  }


  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        ROUTES.ADD_COMMENT(selectedPost?._id),
        { text },
        { withCredentials: true }
      );

      if (res.data.success) {
        const newComment = res.data.data.comment;

        // Update local state
        const updatedCommentData = [...comment, newComment];
        setComment(updatedCommentData);

        // Update Redux store
        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));

        setText("");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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
              src={selectedPost?.image}
              alt="postImg"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePhoto}/>
                    <AvatarFallback>BN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">

                  <Link className="font-semibold text-sm">{selectedPost?.author?.username}</Link>
                  <span className="text-gray-600 text-xs">Good</span>
                </div>
                  <div className="flex items-center gap-4 ">
            { user._id === selectedPost?.author?._id && <Badge variant={"secondary"}>Author</Badge> }
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
              {
                  comment.map((c)=>{
                  return <Comment key={c?._id} comment={c}/>
                })
              } 
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Add Commments..." 
                    onChange={changeEventHandler}
                    value={text}
                    className="w-full outline-none border border-gray-300 p-2 rounded"
                  />
                  <Button disabled={!text.trim()} variant="outline" onClick={sendMessageHandler}>Send</Button>
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;

