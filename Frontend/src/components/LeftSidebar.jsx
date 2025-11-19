import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notifications" },
  { icons: <PlusSquare />, text: "Create" },
  {
    icons: (
      <Avatar className='w-7 h-7'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>BN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icons: <LogOut />, text: "Logout" },
];

function LeftSidebar() {

    const navigate = useNavigate();

    const logoutHandler = async() =>{
        try {
            const res = await axios.get("http://localhost:5000/api/auth/logout",{withCredentials:true});

            if(res.data.success){
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const sidebarHandler = (textType) =>{
        if(textType === 'Logout'){
            logoutHandler();
        }
    }
  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1>LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div key={index} onClick={() => sidebarHandler(item.text)} className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3">
                {item.icons}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
