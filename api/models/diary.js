import mongoose from "mongoose";

const DiarySchema=new mongoose.Schema(
    {
        diaryId:Number,
        title: String,
        description: String,
        diaryList: [
            {
                date:Date,
                note:String
            }
        ],
        userId:String
    }
)

const diaryModel=mongoose.model('diary',DiarySchema);

export default diaryModel;