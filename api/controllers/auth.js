import userModel from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register=async (req,res)=>{
    const {username,email,password}=req.body;

    const user=await userModel.findOne({username});
    if(user) return res.status(409).json("User already present");

    const salt=bcrypt.genSaltSync(10);
    const hashpassword=bcrypt.hashSync(password,salt);

    userModel.create({username,email,password:hashpassword,img:null});
    return res.status(200).json("user created");
}

export const login=async (req,res)=>{
    const {username,password}=req.body;

    const user=await userModel.findOne({username});
    if(!user) return res.status(404).json("User not found");

    const checkpassword=bcrypt.compareSync(password,user.password)
    if(!checkpassword) return res.status(403).json("Wrong username or password");

    const token=jwt.sign({ userId: user._id },"secretkey");

    res.cookie("accessToken",token,{
        httpOnly:true,
        secure:true
    }).status(200).json("User logged in successfully");
}

export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
       }).status(200).json("user has been logged out")
}