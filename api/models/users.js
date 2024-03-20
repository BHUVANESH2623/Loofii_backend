import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema(
    {
        userId:{
            type:String
        },
        img:{
            type:String
        },
        username:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        }
    }
)

const userModel=mongoose.model('users',UserSchema);

export default userModel;