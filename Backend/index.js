import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
dotenv.config({ quiet: true });

import allRoutes from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOption = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

app.listen(PORT, () => {
  console.log(`Instagram Server Running on Port ${PORT}`);
});
