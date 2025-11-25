import jwt from "jsonwebtoken";
import { serverConfig } from "../utils/constant.js";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User Not Authenticated",
      });
    }

    const decoded = await jwt.verify(token, serverConfig.JWT_SECRET_KEY);
    // console.log(decoded);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // req.id = decoded.userId;
    req.id = user._id;
    req.user = user;
    // req.userId = user._id;

    next();
  } catch (error) {}
};
