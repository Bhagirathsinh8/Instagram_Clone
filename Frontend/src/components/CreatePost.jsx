import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/utils/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const dataUrl = await readFileAsDataURL(selected);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async () => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/post/add-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPosts([res.data.data, ...posts]));
        toast.success(res.data.message);

        // Reset form
        setCaption("");
        setFile(null);
        setImagePreview("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center font-semibold">
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Add your image and caption</DialogDescription>
        </DialogHeader>

        {/* USER INFO */}
        <div className="flex gap-3 items-center mt-3">
          <Avatar>
            <AvatarImage
              src={user?.profilePicture}
              alt="profile_img"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">{user?.username}</h1>
            <span className="text-gray-600 text-xs">{user?.bio}</span>
          </div>
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreview && (
          <div className="w-full flex justify-center mt-4">
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-64 w-full object-contain rounded-lg"
            />
          </div>
        )}

        {/* CAPTION */}
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="mt-4 resize-none focus-visible:ring-transparent"
        />

        {/* FILE INPUT (HIDDEN) */}
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={fileChangeHandler}
        />

        {/* SELECT IMAGE BUTTON */}
        <Button
          onClick={() => imageRef.current.click()}
          className="w-full bg-[#0095F6] hover:bg-[#258bcf] mt-3"
        >
          Select From Device
        </Button>

        {/* POST BUTTON */}
        {imagePreview &&
          (loading ? (
            <Button className="w-full mt-3">
              <Loader2 className="mr-2 w-4 animate-spin" /> Posting...
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              className="w-full mt-3"
              disabled={!caption.trim() && !file}
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
