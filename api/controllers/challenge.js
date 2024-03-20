import challengeModel from "../models/challenge.js";
import jwt from 'jsonwebtoken';

export const getChallenges=async(req,res)=>{
    try{
        const result=await challengeModel.find();
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
    }
}

export const getChallenge=async(req,res)=>{
    try{
        const challengeId=req.params.id;
        const result=await challengeModel.findOne({challengeId})
        return res.status(200).json(result);
    }
    catch(err)
    {
        return res.status(500).json("Current challenge cannot be opende")
    }
}

export const postChallenge=async(req,res)=>{
    const token2=req.cookies?.accessToken;
    if(!token2) return res.status(401).json("User not logged in");
    jwt.verify(token2,"secretkey",async(err,data)=>{
        if(err) return res.status(409).json("Token is not valid");
        
        const {title,description,dateCount,challenList}=req.body;
        const userId=data.userId;
        const challengeId=await challengeModel.countDocuments({})+1;

        const newChallenge=new challengeModel(
            {
                challengeId,
                title,
                description,
                dateCount,
                challenList,
                userId
            }
        )

        try{
            await newChallenge.save();
            res.status(200).json("New Schedule is created");
        }
        catch(err){
           res.status(500).json("err in creating challenge");
        }
    })
}

export const addTasks=async(req,res)=>{
    const { input } = req.body;
    const challengeId = req.params.id;

    try {
    const result=await challengeModel.findOne({challengeId});
    const size=result.challenList.length + 1 ;
    // Push the new element into the 'challenList' array
    await challengeModel.updateOne(
        { "challengeId": challengeId },
        { $push: { "challenList": { "listId": size, "cval": input } } }
    );

    return res.status(200).json({ message: "New challenge is created" });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred" });
    }

}

export const updateTask=(req,res)=>{
    
}