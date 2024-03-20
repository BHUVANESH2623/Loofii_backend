import mongoose from 'mongoose';

const challengeSchema=mongoose.Schema(
    {
        challengeId:Number,
        title:String,
        description:String,
        dateCount:Number,
        challenList:[
            {
                listId:Number,
                cval:String
            }
        ],
        userId:String
    }
)

const challengeModel=mongoose.model('challenge',challengeSchema);

export default challengeModel;