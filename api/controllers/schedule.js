import db from "../db.js"
import scheduleModel from '../models/schedule.js';
import moment from "moment";
import jwt from 'jsonwebtoken';

export const getSchedule=async(req,res)=>{
    try{
        const result=await scheduleModel.find();
        return res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
    }
}

export const postSchedule=async(req,res)=>{
    const token2=req.cookies?.accessToken;
    if(!token2) return res.status(401).json("User not logged in");
    jwt.verify(token2,'secretkey',async(err,data)=>{
        if(err) return res.status(409).json("Token is invalid");

        const {title,description,date}=req.body;
        const scheduleId=await scheduleModel.countDocuments({})+1;
        const userId=data.userId;

        const newSchedule=new scheduleModel({
            scheduleId,
            title,
            date,
            description,
            userId
        });

        try{
            await newSchedule.save();
            res.status(200).json("New Schedule is created");
        }
        catch(err)
        {
            res.status(500).json("err in creating schedule")
        }
    })
}