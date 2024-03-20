import mongoose from 'mongoose';

const scheduleSchema=mongoose.Schema(
    {
        scheduleId:Number,
        title:String,
        date:Date,
        description:String,
        userId:String
    }
);

const scheduleModel=mongoose.model('schedule',scheduleSchema);

export default scheduleModel;