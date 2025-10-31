import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User email Already exist",
      });
    }

    const saltValue = await bcrypt.genSalt(13);
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
        message: "Please Provide all fields",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
    // Set cookie + Send response
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // ✅ use secure cookies in prod
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
    .json({
        status: true,
        message: "User login successful",
        data: {token,user},
      });
  } catch (error) {
    console.log(error);
  }
};


export const logout = (_,res) =>{
    try {
            return res.status(200).cookie("token","",{maxAge:0}).json({
                status:1,
                message:"logout SuccessFully"
            })
    } catch (error) {
        console.log(error)
    }
}