import './challenge.scss';
import ChallengeImg from '../../images/challenge.jpg';
import {Popup} from 'semantic-ui-react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Challenge=()=>{
    
    const [input,setInput]=useState(
        {
            title:"",
            description:"",
            dateCount:'',
            challenList:[]
        }
    )
    const handleInput=(e)=>{
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const [challenges,setChallenges]=useState([]);
    useEffect(()=>{
        try{
            const fetchData=async()=>{
                const result=await axios.get('http://localhost:8080/challenge');
                setChallenges(result.data);
            }
            fetchData();
        }
        catch(err){
            console.log(err);
        }
    },[challenges])
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const {title,description,dateCount,challenList}=input;
            await axios.post('http://localhost:8080/challenge',{
                title,description,dateCount,challenList
            },{
                withCredentials:true
            })

            setInput(
                {
                    title:"",
                    description:"",
                    dateCount:'',
                    challenList:[]
                }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className="challenge">
            <img src={ChallengeImg} alt="" className="challengeimg" />

            <div className="tags">
                <div className="search">
                <input type="text"  placeholder='Search' />
                <SearchOutlinedIcon/>
                </div>
                <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"gray",marginBottom:"10px",marginTop:"10px"}} content=' Create New Challenges'  position="top center" trigger={<button className="create" >Create+</button>} />
            </div>

            <div className="inputdata">
                <div className="title">
                    <h1>Create New Challenge</h1>
                </div>
                <div className="r1">
                    <input type="text" placeholder='Challenge Name' className="val1" name='title' value={input.title} onChange={handleInput} />
                    <input type="number" placeholder='Total Challenge Days' name='dateCount' value={input.dateCount} onChange={handleInput}
                    className="val2" />
                </div>
                <textarea name="description" id="ds2" cols="30" rows="10" className="desc" value={input.description} placeholder='Short description about the Challenge' onChange={handleInput}
                ></textarea>
                <div className="submit">
                    <button onClick={handlesubmit} >Submit</button>
                </div>
            </div>

            {
                challenges.map((challenge)=>(
                    <div className="data" key={challenge.challengeId}>
                        <Link className="link" to={`/challenge/${challenge.challengeId}`}>
                            <div className="ds">
                            <div className="d">
                                <h1>{challenge.title}</h1>
                                <p>{challenge.description}</p>
                            </div>
                            <div className="progress">
                                <span className="day">Day {challenge.dateCount}</span>
                                <div className="status">
                                {challenge.dateCount? <span className="comp">Completed</span>:
                                    <span className='onprog'>On progress</span>
                                }
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}