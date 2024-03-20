import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import diaryRoutes from './routes/diary.js';
import scheduleRoutes from './routes/schedule.js';
import challengeRoutes from './routes/challenge.js';
import todoRoutes from './routes/todo.js';
import passport from 'passport';
import  './passport.js';
import cookieSession from 'cookie-session';
dotenv.config();

const app=express();
db();
app.use(cookieParser());
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cors(
    {
        origin:"http://localhost:3000"
    }
));

app.use(cookieSession({
    name:"Oauthsession",
    keys:["secretkey"],
    maxAge:24*60*60*1000,
}))


app.use(passport.initialize());
app.use(passport.session());




// const jwt = require('jsonwebtoken');
 // Replace with your actual secret key




app.use('/auth',authRoutes);
app.use('/diary',diaryRoutes);
app.use('/schedule',scheduleRoutes);
app.use('/challenge',challengeRoutes);
app.use('/todo',todoRoutes);

app.listen(process.env.PORT||2542,()=>{
    console.log("Server connected")
})