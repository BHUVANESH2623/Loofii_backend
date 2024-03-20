import './challen.scss';
import ChallenImg from '../../images/challen.jpg';
import Edit from '../../images/edit.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const Challen=()=>{
    const [tasks,setTasks]=useState([]);
    const location=useLocation();
    const challengeId=location.pathname.split('/')[2];
    const [input,setInput]=useState("");

           const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                await axios.post(`http://localhost:8080/challenge/${challengeId}`,{input},{
                    withCredentials:true
                })
                setInput('');
            }
            catch(err)
            {
                console.log(err);
            }
           }
           useEffect(()=>{
            try{
                const fetchData=async()=>{
                    const res=await axios.get(`http://localhost:8080/challenge/${challengeId}`);
                    setTasks(res.data.challenList);
                }
                fetchData();
            }
            catch(err)
            {
                console.log(err);
            }
           },[challengeId,tasks])
    return (
        <div className="challen">
           <img src={ChallenImg} alt="" className="challenimg" />
           <div className="abouts">
                <h1>Title of current Challenge</h1>
                <p>Nature is incredibly diverse, with millions of species of plants</p>
            </div>
            <div className="dayvalue">
                {/* <h3>Day 15</h3> */}
                {/* <input type="text"  placeholder='Task performed' className="challenge" /> */}
                <textarea className='challenge' name="challenge" id="e1" cols="30" rows="10" placeholder='Enter the status of challenge' value={input} onChange={(e)=>setInput(e.target.value)} ></textarea>

                <button className="add" onClick={handleSubmit}>Add</button>
            </div>
            {
            tasks?.reverse().map((task) => (
                <div className="tasks" key={task.listId}>
                    <div className="task">
                        <h3>Day {task.listId}</h3>
                        <p>{task.cval}</p>
                        <img src={Edit} className='edit' alt="" />
                    </div>
                </div>
            ))
            }
        </div>
    )
}