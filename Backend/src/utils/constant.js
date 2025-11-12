import dotenv from "dotenv";
dotenv.config({quiet:true});

export const serverConfig = {
  BASE_URL: process.env.BASE_URL || "http://localhost:5000",
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "ThisismySecretKey",
  FRONTEND_URL:"http://localhost:5173"
};

export const db = {
  MONGO_DB_URL:
    process.env.MONGO_DB_URL || "mongodb://localhost:27017/job_portal",
};

export const status = {
  ZERO: 0,
  ONE: 1,
  TRUE: true,
  FALSE: false,
};

export const models = {
  USER: "User",
  POST: "Post",
  COMMENT: "Comment",
  CONVERSATION: "Conversation",
  MESSAGE: "Message",
  BOOKMARKS: "Bookmarks"
};
