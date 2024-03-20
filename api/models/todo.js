import mongoose from "mongoose";

const tosoSchema=mongoose.Schema({
    todoId:Number,
    title:String,
    date:Date,
    todoList:[
        {
            completed:Boolean,
            task:String,
        }
    ],
    userId:String
})

const todoModel=mongoose.model('todo',tosoSchema);

export default todoModel;