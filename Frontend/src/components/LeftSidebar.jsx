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
import { PATH, ROUTES } from "@/utils/constant";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { clearNotifications } from "@/redux/rtnSlice";

function LeftSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const [open, setOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(ROUTES.LOGOUT_ENDPOINT, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        localStorage.clear("token");
        navigate(PATH.LOGIN);
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
        navigate(PATH.HOME);
        break;
      case "Create":
        setOpen(true);
        break;
      case "Logout":
        logoutHandler();
        break;
      case "Profile":
        navigate(PATH.PROFILE(user?._id));
        break;
      case "Messages":
        navigate(PATH.MESSAGES_PAGE);
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
            src={user?.profilePhoto || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>BN</AvatarFallback>
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
            {sidebarItems.map((item, index) => {
              const isNotification = item.text === "Notifications";

              // show only likes from OTHER users
              const otherUserLikes = likeNotification.filter(
                (n) => n.userId !== user._id
              );

              return (
                <div
                  key={index}
                  onClick={() => sidebarHandler(item.text)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
                >
                  {/* ICON + BADGE WRAPPER */}
                  <div className="relative">
                    {item.icons}

                    {/* BADGE ONLY IF OTHER USERS LIKED */}
                    {isNotification && otherUserLikes.length > 0 && (
                      <Popover
                        open={isNotifOpen}
                        onOpenChange={(open) => {
                          setIsNotifOpen(open);

                          if (!open) {
                            dispatch(clearNotifications());
                          }
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            className="absolute -top-2 -right-2 rounded-full h-5 w-5 p-0 bg-red-500 text-white flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {otherUserLikes.length}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-64">
                          <div className="flex flex-col gap-3">
                            {otherUserLikes.map((notification) => (
                              <div
                                key={notification.userId}
                                className="flex items-center gap-2 my-2"
                              >
                                <Avatar>
                                  <AvatarImage
                                    src={notification.userDetails?.profilePhoto}
                                  />
                                  <AvatarFallback>BN</AvatarFallback>
                                </Avatar>

                                <p className="text-sm">
                                  <span className="font-bold">
                                    {notification.userDetails?.username}
                                  </span>{" "}
                                  liked your post
                                </p>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>

                  {/* TEXT */}
                  <span className="hidden lg:block text-[15px]">
                    {item.text}
                  </span>
                </div>
              );
            })}
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
