import express  from "express";
import { getDiaries, getDiary, postDiary, updateDiary } from "../controllers/diary.js";
import jwt from 'jsonwebtoken';

const router=express.Router();


// const secretKey = 'secretkey';

function verifyToken(req, res, next) {
    const token = req.cookies.Oauthsession;
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWEzNjgwOTBjMTRiYWEwMmFjZDg2NCIsImlhdCI6MTY5NDk1MDAwNX0.g1P9pjqybUFh3KHFYpCw6Z5V1oGAo5xOUoEUlh2k1XY"
    console.log(token);// Assuming the token is sent in the "Authorization" header

    if (!token) {
        return res.status(401).json("Unauthorized1"); // No token provided
    }

    jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
            return res.status(401).json("Unauthorized2"); // Invalid token
        }

        req.user = decoded; // Attach the decoded user data to the request
        next();
    });
}

router.get('/',getDiaries);
router.get('/:id',getDiary);
// router.post('/',verifyToken,postDiary);
router.post('/',postDiary);
router.post('/:id',updateDiary);
// router.put('/:id',updateDiary);
export default router;