import './login.scss';
import Google from '../../images/google.png';
import Github from '../../images/githubcolor.png';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export const Login=()=>{
    const google=()=>{
        window.open("http://localhost:8080/auth/google","_self")
    }
    const github=()=>{
        window.open("http://localhost:8080/auth/github","_self")
    }
    const [input,setInput]=useState({
        username:"",
        password:""
    })
    const handleInputs=(e)=>{
        setInput(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/auth/login',input,{
                withCredentials:true
            })
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="login">
            <h1 className='title'>Choose a method to Login</h1>
            <div className="wrapper">
                <div className="left">
                    <div className="loginbutton google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginbutton github" onClick={github}>
                        <img src={Github} alt="" className="icon" />
                        Github
                    </div>
                    <div>
                       <span>
                       Create a new account? <Link className='link' to={'/register'}>Sign up</Link>
                       </span>
                    </div>
                </div>
                <div className="center">
                    <div className="line" />
                    <div className="or">OR</div>
                </div>
                <div className="right">
                    <form action="">
                        <input type="text" placeholder='Username' name='username' required onChange={handleInputs} />
                        <input type="password" placeholder='Password' name='password' required  onChange={handleInputs}/>
                        <button onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}