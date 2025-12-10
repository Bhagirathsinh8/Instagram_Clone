import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import { ROUTES } from "@/utils/constant";

function ChatPage() {
  const { user, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages,currentFollowingUsers } = useSelector((store) => store.chat);

  const [textMessage, setTextMessage] = useState("");
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        ROUTES.SEND_MESSAGE(receiverId),
        { message: textMessage },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.data]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen md:ml-[16%]">

      {/* LEFT SIDEBAR — MOBILE + DESKTOP */}
      <section
        className={`
          w-full md:w-1/4 my-3
          ${selectedUser ? "hidden md:block" : "block"} 
        `}
      >
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />

        <div className="overflow-y-auto h-[80vh]">
          {currentFollowingUsers.map((current_user) => {
            const isOnline = onlineUsers.includes(current_user?._id);

            return (
              <div
                key={current_user?._id}
                onClick={() => dispatch(setSelectedUser(current_user))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={current_user?.profilePhoto} />
                  <AvatarFallback>BN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-medium">{current_user?.username}</span>
                  <span
                    className={`text-sm font-semibold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RIGHT — CHAT WINDOW */}
      {selectedUser ? (
        <section className="flex-1 border-l border-gray-300 flex flex-col h-full">

          {/* MOBILE BACK BUTTON */}
          <div className="flex items-center gap-3 p-2 border-b border-gray-300 sticky top-0 bg-white md:hidden">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            />
            <Avatar>
              <AvatarImage src={selectedUser?.profilePhoto} alt="profile" />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
            <span className="font-medium">{selectedUser?.username}</span>
          </div>

          {/* DESKTOP HEADER */}
          <div className="hidden md:flex gap-3 items-center py-2 px-3 border-b border-gray-300 bg-white">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePhoto} alt="profile" />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
            <span className="font-medium">{selectedUser?.username}</span>
          </div>

          <Messages selectedUser={selectedUser} />

          {/* MESSAGE INPUT */}
          <div className="flex items-center p-4 border-t-gray-300">
            <Input
              type="text"
              placeholder="Message..."
              className="flex-1 mr-2 focus-visible:ring-transparent"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && textMessage.trim()) {
                  sendMessageHandler(selectedUser._id);
                }
              }}
            />
            <Button onClick={() => sendMessageHandler(selectedUser._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        // EMPTY SCREEN (WHEN NO CHAT SELECTED)
        <div className="hidden md:flex flex-col items-center justify-center flex-1">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium text-xl">Your Messages</h1>
          <span>Send a message to start chatting</span>
        </div>
      )}
    </div>
  );
}

export default ChatPage;

