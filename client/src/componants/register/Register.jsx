import './register.scss';
import Google from '../../images/google.png';
import Github from '../../images/githubcolor.png';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export const Register=()=>{

    const google=()=>{
        window.open("http://localhost:8080/auth/google","_self")
    }
    const github=()=>{
        window.open("http://localhost:8080/auth/github","_self")
    }

    const [input,setInput]=useState({
        username:'',
        email:'',
        password:''
    })

    const handleInputs=(e)=>{
        setInput(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/auth/register',input,{
                withCredentials:true
            })
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="register">
            <h1 className='title'>Choose a method to Register</h1>
            <div className="wrapper">
                <div className="left">
                    <div className="loginbutton google " onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Google
                    </div>
                    <div className="loginbutton github" onClick={github}>
                        <img src={Github} alt="" className="icon" />
                        Github
                    </div>
                    <div>
                    <span>Already have an account? <Link className='link' to={'/login'}>Sign In</Link></span>
                    </div>
                </div>
                <div className="center">
                    <div className="line" />
                    <div className="or">OR</div>
                </div>
                <div className="right">
                    <form action="">
                        <input type="text" placeholder='Username' required name='username' onChange={handleInputs}/>
                        <input type="email" placeholder='Email' required name='email' onChange={handleInputs} />
                        <input type="password" placeholder='Password' required name='password' onChange={handleInputs}/>
                        <button onClick={handleSubmit}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}