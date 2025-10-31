import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Register User
export const register = async (req,res) =>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Something is missing,Please Check:"
            });
        }

        const user = await User.findOne({email});

        if(user){
             return res.status(409).json({
                success:false,
                message:"User email Already exist"
            })
        };

        const saltValue = await bcrypt.genSalt(13)
        const hashPassword = await bcrypt.hash(password, saltValue)
        const newUser = await User.create({
            username,email,password:hashPassword
        })
        
        return res.status(201).json({
            success:true,
            message:"User Created Successfully",
            data:newUser
        });
    } catch (error) {
        console.log(error)
    }
}

//Login User

export const login = async(req,res) =>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                status:false,
                message:"Please Provide all fields"
            });
        }

        const user = await User.findOne({ email });
        console.log(user)

        if(!user){
             return res.status(404).json({
                status:false,
                message:"User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
             return res.status(401).json({
                status:false,
                message:"Invalid Credentials"
            });
        }
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{
            expiresIn:'30d'
        })

        return res.status(200).json({
                status:true,
                message:"User Login Successfully",
                data:{token,user}
            });
    } catch (error) {
            console.log(error);
    }
}