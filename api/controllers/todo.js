import todoModel from '../models/todo.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const getTodo=(req,res)=>{

}

export const postTodo=async(req,res)=>{
    const token2=req.cookies?.accessToken;
    if(!token2) return res.status(401).json("User not logged in");
    jwt.verify(token2,'secretkey',async(err,data)=>{
        if(err) return res.status(409).json("Token not valid");

        const {title,todoList}=req.body;
        const userId=data.userId;
        const todoId=await todoModel.countDocuments({})+1;
        const date=moment(Date.now()).format('YYYY-MM-DD');
        const newTodo=new todoModel({
            todoId,
            title,
            date,
            todoList,
            userId
        })

        try{
            await newTodo.save();
            return res.status(200).json('new todo created')
        }
        catch(err)
        {
            return res.status(500).json("err in creating new todoList")
        }
    })
}

export const postTask=(req,res)=>{

}
