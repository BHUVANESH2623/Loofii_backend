import diaryModel from '../models/diary.js';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import moment from 'moment/moment.js';
export const getDiaries=async(req,res)=>{
    try{
        const result=await diaryModel.find();
        return res.status(200).json(result);
    }
    catch(err)
    {
        res.status(500).json("The Diary data can be feteched.There will be some internal error");
    }
}

export const getDiary=async(req,res)=>{
    try{
        const diaryId=req.params.id;
        const result=await diaryModel.findOne({diaryId});
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json("Current Diary cannot be open.There will be some internal error");
    }
}

export const postDiary=async(req,res)=>{
    try{
        const token1=req.cookies?.Oauthsession;
        if(token1 !==undefined)
        {
            console.log(token1);
            if(err) return res.status(403).json("error in the token")

            const {title,description,diaryList}=req.body;
            const diaryId=db.diary?.totalSize()+1;
            await diaryModel.create({
                diaryId,title,description,diaryList,
            })

            res.status(200).json("New diary created successfully using the oauth");
        }
        else{
            const token2=req.cookies?.accessToken;
            // console.log(token2);
            if(!token2) return res.status(403).json("User not logged in");
            jwt.verify(token2,"secretkey",async(err,data)=>{
                if(err) return res.status(409).json("Invalid token or token expired");
                const {title,description,diaryList}=req.body;
                const diaryId = await diaryModel.countDocuments({})+1;
                // console.log(diaryId);
                // const userId=data._id;
                const userId= data.userId;
                // console.log(userId);
                const newDiary = new diaryModel({
                    diaryId,
                    title,
                    description,
                    diaryList,
                    userId
                  });
                //   console.log(newDiary);

                  try {
                    await newDiary.save();
                    res.status(200).json("New diary created successfully");
                  } catch (saveError) {
                    // console.error(saveError);
                    res.status(500).json({ error: "Error creating diary entry" });
                  }
            })
        }
    }
    catch(err){
        res.status(500).json("Cannot be stored in the database");
    }
}
export const updateDiary = async (req, res) => {
    try {
    const { input } = req.body;
    const date=moment(Date.now()).format("YYYY-MM-DD ")
    if (!input) {
    return res.status(400).json({ error: "Invalid request. 'updatelist' is required." });
    }
    const diaryId=req.params.id;
    const result=await diaryModel.findOne({diaryId});
    const arr=result.diaryList;

    arr.push({note:input,date});
    await diaryModel.updateOne({diaryId},{$set:{diaryList:arr}})
    return res.status(200).json("data inserted successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  