
//Important but for make global socket then use

import { io } from "socket.io-client";
import { ROUTES } from "./constant";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket && userId) {
    socket = io(ROUTES.BASE_SOCKET, {
      query: { userId },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
