import './schedule.scss';
import ScheduleImg from '../../images/schedule.jpg';
import { CountdownTimer } from '../timer/DisplayTime';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Schedule=()=>{
    const [input,setInput]=useState(
        {
            title:"",
            description:"",
            date:null
        }
    )
    const handleInput=(e)=>{
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const {title,date,description}=input;
            await axios.post('http://localhost:8080/schedule',{title,date,description},{
                withCredentials:true
            })
            setInput(
                {
                    title:"",
                    description:"",
                    date:''
                }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    const [schedules,setSchedules]=useState([]);

    useEffect(()=>{
        try{
            const fetchdata=async()=>{
                const res=await axios.get('http://localhost:8080/schedule');
                setSchedules(res.data);
            }
            fetchdata();
        }
        catch(err){
            console.log(err);
        }
    },[schedules])
    return (
        <div className="schedule">
            <img src={ScheduleImg} alt="" className="scheduleimg" />
            <div className="inputdata">
                <div className="title">
                    <h1>Schedule Events</h1>
                </div>
                <div className="r1">
                    <input type="text" placeholder='Event Name' className="val" name='title' value={input.title} onChange={handleInput} />
                    <input type="datetime-local" name='date' value={input.date} onChange={handleInput}
                    className="val" />
                </div>
                <textarea name="description" id="zx2" cols="30" rows="10" className="desc" placeholder='Short description about the event' onChange={handleInput} value={input.description}
                ></textarea>
                <div className="submit">
                    <button onClick={handlesubmit}>Submit</button>
                </div>

            </div>

            {/* <input
        type="datetime-local"
      /> */}
            <div className="container">

            {
                schedules.map((schedule)=>(
                    <div className="schedules" key={schedule.scheduleId}>
                        <div className="sch">
                            <div className="topic">
                                <h1>{schedule.title}</h1>
                                <CountdownTimer targetDate={schedule.date}/>
                                
                            </div>

                            <span className="start">
                               Starts On: {moment(schedule.date).format("DD-MM-YYYY HH:mm:ss")}
                            </span>
                            <p>
                               About: {schedule.description}
                            </p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}