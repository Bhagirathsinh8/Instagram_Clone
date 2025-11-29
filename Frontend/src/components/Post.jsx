import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [postLike, setPostLike] = useState(post.likes.length);

  const updatedPost = posts.find((p) => p._id === post._id) || post;
  const comment = updatedPost.comments; // always fresh from Redux

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/post/${post._id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatePostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatePostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.put(
        `http://localhost:5000/api/post/${action}/${post?._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLike = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLike);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // 👉 FIXED COMMENT HANDLER
  const commentHandler = async () => {
    if (!text.trim()) return toast.error("Comment cannot be empty");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/post/comment/${post._id}`,
        { text },
        { withCredentials: true }
      );

      if (res.data.success) {
        const newComment = res.data.data.comment;

        // Update Redux store only
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? { ...p, comments: [...p.comments, newComment] }
            : p
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
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePhoto} alt="post_avimage" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <h1>{post.author?.username}</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {user && user._id !== post?.author?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ed4956] font-bold"
              >
                Unfollow
              </Button>
            )}

            <Button variant="ghost" className="cursor-pointer w-fit ">
              Add to Favourites
            </Button>

            {user && user._id === post?.author?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ed4956] font-bold"
                onClick={deletePostHandler}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <img
        className="rounded-md my-2 w-full aspect-square object-cover"
        src={post.image}
        alt="postImage"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              size={"22px"}
              className="cursor-pointer text-red-600"
              onClick={likeOrDislikeHandler}
            />
          ) : (
            <FaRegHeart
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
              onClick={likeOrDislikeHandler}
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>

        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>

      <span className="font-normal block mb-2 ">{postLike} likes</span>

      <p>
        <span className="font-medium mr-2">{post.author?.username}</span>
        {post?.caption}
      </p>

      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          view all {comment.length} Comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (text.trim()) commentHandler();
            }
          }}
          className="outline-none text-sm w-full"
        />

        {text && (
          <span className="text-[#3BADF8]" onClick={commentHandler}>
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
