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
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);

  // Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        localStorage.clear("token");
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Sidebar item handling
  const sidebarHandler = (type) => {
    switch (type) {
      case "Home":
        navigate("/");
        break;
      case "Create":
        setOpen(true);
        break;
      case "Logout":
        logoutHandler();
        break;
      case "Profile":
        navigate(`/profile/${user?._id}`);
        break;
      default:
        break;
    }
  };

  // Sidebar items
  const sidebarItems = [
    { icons: <Home size={22} />, text: "Home" },
    { icons: <Search size={22} />, text: "Search" },
    { icons: <TrendingUp size={22} />, text: "Explore" },
    { icons: <MessageCircle size={22} />, text: "Messages" },
    { icons: <Heart size={22} />, text: "Notifications" },
    { icons: <PlusSquare size={22} />, text: "Create" },
    {
      icons: (
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={user?.profilePicture || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icons: <LogOut size={22} />, text: "Logout" },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen z-20 border-r bg-white border-gray-200 w-[18%] lg:w-[15%] px-4 py-4">
        <div className="flex flex-col w-full">

          {/* Logo */}
          <div className="flex items-center gap-2 justify-center bg-gray-50 p-3 rounded-md mb-6">
            <h1 className="text-xl font-bold">LOGO</h1>
            <img
              src="https://img.freepik.com/premium-vector/instagram-vector-social-media-icon_459124-558.jpg"
              alt="logo"
              className="w-8 h-8 rounded"
            />
          </div>

          {/* Sidebar Items */}
          <div className="flex flex-col gap-1">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
              >
                {item.icons}
                <span className="hidden lg:block text-[15px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePost open={open} setOpen={setOpen} />
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-20 bg-white border-t border-gray-300 flex justify-around py-2 shadow-md">
        {/* .filter(item => ["Home", "Search", "Explore", "Messages", "Create"].includes(item.text)) */}
        {sidebarItems.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => sidebarHandler(item.text)}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            {item.icons}
          </div>
        ))}
      </div>
    </>
  );
}

export default LeftSidebar;
