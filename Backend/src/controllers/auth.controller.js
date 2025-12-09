import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serverConfig } from "../utils/constant.js";

//Register User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Something is missing,Please Check:",
      });
    }

    const user = await User.findOne({ email }).lean();

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User email Already exist",
      });
    }

    const saltValue = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltValue);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login User

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide both email and password",
      });
    }

    // Don't use lean()
    const user = await User.findOne({ email })
      .populate("posts")
      .populate("following", "username")
      .populate("followers", "username");

    if (!user) {
      return res.status(404).json({
        status: 0,
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 0,
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      serverConfig.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    // Convert user document to object and remove password
    const safeUser = user.toObject();
    delete safeUser.password;

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        status: 1,
        success: true,
        message: "User login successful",
        data: { token, user: safeUser },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 0, success: false, message: "Server error" });
  }
};

//Logout User
export const logout = (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      status: 1,
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.log(error);
  }
};
