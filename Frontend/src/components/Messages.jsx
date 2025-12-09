import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PATH } from "@/utils/constant";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);

   // Ref to scroll into view
  const messagesEndRef = useRef(null);

  // Auto-scroll whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePhoto} alt="profile" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={PATH.PROFILE(selectedUser?._id)}>
            <Button className="h-8 my-2" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {messages?.map((msg) => {
          const isSender = msg.senderId === selectedUser?._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isSender ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] break-words ${
                  isSender ? "bg-gray-200" : "bg-blue-500 text-white"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;
