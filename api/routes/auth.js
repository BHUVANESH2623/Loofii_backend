import express from 'express';
import { login,register,logout } from '../controllers/auth.js';
import passport from 'passport';

const router=express.Router();

router.post('/login',login);
router.post('/register',register);
router.post('/logout',logout);

router.get('/login/success',(req,res)=>{
    if(req.user){
        res.status(200).json(
            {
                success:true,
                message:"success",
                user:req.user,
                // cookies:req.cookies
            }
        )
    }
})

router.get('/login/failed',(req,res)=>{
    res.status(401).json(
        {
            success:false,
            message:"failure"
        }
    )
})

router.get('/logout',(req,res)=>{
    req.session = null;
    req.logout();
    res.clearCookie("Oauthsession",{
        secure:true,
        sameSite:"none"
       }).status(200).json("user has been logged out")
    // res.clearCookie("Oauthsession").json("User logged out");
    // res.redirect("http://localhost:3000");
})
router.get('/google',passport.authenticate("google",{scope:["profile","email"]}))
router.get('/google/callback',passport.authenticate('google',{
    successRedirect:"http://localhost:3000",
    failureRedirect:"/login/failed"
}))
router.get('/github',passport.authenticate("github",{scope:['read:user', 'user:email']}))
router.get('/github/callback',passport.authenticate('github',{
    successRedirect:"http://localhost:3000",
    failureRedirect:"/login/failed"
}))

export default router;