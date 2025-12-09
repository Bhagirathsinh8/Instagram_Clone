import { Server } from "socket.io";
import express from "express";
import http from "http";
import { serverConfig } from "../utils/constant.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [serverConfig.FRONTEND_URL ,"http://localhost:5173" , "https://5x8r3p4w-5173.inc1.devtunnels.ms","https://5x8r3p4w-5000.inc1.devtunnels.ms"],
    methods: ["GET", "POST", "PUT", "DELETE"],
credentials:true
  },
});

const userSocketMap = {}; //this can store socket id of user id  --> socket id

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(
      `Login - User Connected  User ID = ${userId} , SocketId = ${socket.id}`
    );
  }

  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      console.log(
        `Logout - User Connected  User ID = ${userId} , SocketId = ${socket.id}`
      );
      delete userSocketMap[userId];
    }
     io.emit('getOnlineUsers',Object.keys(userSocketMap));
  });
});


export {app,server,io};

// ==============================================================================================================



