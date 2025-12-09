import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
dotenv.config({ quiet: true });

import allRoutes from "./src/routes/index.js";
import { serverConfig } from "./src/utils/constant.js";
import { app,server } from "./src/socket/socket.js";

// const app = express();
const PORT = serverConfig.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
  origin: [serverConfig.FRONTEND_URL, "http://localhost:5173" , "https://5x8r3p4w-5173.inc1.devtunnels.ms","https://5x8r3p4w-5000.inc1.devtunnels.ms"],
  credentials: true,
};
app.use(cors(corsOption));

// Connect to MongoDB Server
ConnectDB();

// API routes
app.use('/api', allRoutes);

// Health Check
app.get("/", (req, res) => {
  return res.status(200).json({
    status: 1,
    success: true,
    message: "Instagram Server",
  });
});

server.listen(PORT, () => {
  console.log(`Instagram Server Running on Port ${PORT}`);
});
