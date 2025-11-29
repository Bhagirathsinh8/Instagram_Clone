import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";


function LeftSidebar() {
  const navigate = useNavigate();
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);



  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        localStorage.clear("token");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };




  const sidebarHandler = (textType) => {
    if (textType === "Logout"){
      logoutHandler();
    } else if (textType === "Create"){
      setOpen(true);
    }

  };

  const sidebarItems = [
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notifications" },
  { icons: <PlusSquare />, text: "Create" },
  {
    icons: (
      <Avatar className="w-7 h-7">
       <AvatarImage src={user?.profilePhoto || "https://github.com/shadcn.png"} />
        <AvatarFallback>BN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icons: <LogOut />, text: "Logout" },
];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[20%] lg:w-[16%] h-screen bg-white">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center w-full mb-3 p-5 bg-gray-100">
            <h1 className="my-8 pl-3 font-bold text-xl">LOGO</h1>
            <img
              src="https://img.freepik.com/premium-vector/instagram-vector-social-media-icon_459124-558.jpg?semt=ais_hybrid&w=740&q=80"
              alt="logo"
              height={50}
              width={50}
            />
          </div>

          <div>
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="flex items-center gap-3 hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
              >
                {item.icons}
                <span className="hidden lg:block">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen}/>
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed  bottom-0 left-0 w-full z-20 bg-white border-t border-gray-300 flex justify-around py-3">
        {sidebarItems.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="flex flex-col items-center text-sm cursor-pointer overflow-auto"
          >
            {item.icons}
          </div>
        ))}
      </div>
    </>
  );
}

export default LeftSidebar;