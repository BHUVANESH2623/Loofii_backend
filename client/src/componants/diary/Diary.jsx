import './diary.scss';
import Diaryimg from '../../images/diary.jpg';
import {Link} from 'react-router-dom';
// import Popup from 'reactjs-popup';
import {Popup} from 'semantic-ui-react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import e from 'express';
export const Diary=()=>{
    const [diary,setDiary]=useState([
        {
            title:"",
            description:"",
            diaryList:[],
        }
    ]);
    const handleInput=(e)=>{
        setDiary((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            // console.log(diary);
            const { title, description, diaryList } = diary;
            await axios.post("http://localhost:8080/diary",{title,
            description,
            diaryList,},{
                withCredentials:true
            })
            setDiary(
                {
                    title:"",
                    description:"",
                    diaryList:[],
                }
            );
        }
        catch(err){
            console.log(err);
        }
    }
    const [datas,setDatas]=useState([]);
    useEffect(()=>{
        try{
            const fetchdata=async()=>{
                const result=await axios.get('http://localhost:8080/diary');
                setDatas(result.data);
            }

            fetchdata();
        }
        catch(err)
        {
            console.log(err);
        }
    },[datas]);
    return (
        <div className="diary">
            <img src={Diaryimg} alt="" className="notes" />
            <div className="abouts">
                    <h1>Title of current notes</h1>
                    <p>Nature is incredibly diverse, with millions of species of plants</p>
            </div>
            <div className="tags">
                <div className="search">
                <input type="text"  placeholder='Search' />
                <SearchOutlinedIcon/>
                </div>
                {/* <div className="popup">
                    <Popup 
                        trigger={(
                            <button className="create" >Create +</button>
                        )}
                        position="top center"
                        on={['hover', 'focus']}
                        // closeOnDocumentClick
                        >
                        <span> Create New Diary</span>
                    </Popup>
                </div> */}
                <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"gray",marginBottom:"10px",marginTop:"10px"}} content=' Create New Diary'  position="top center" trigger={<button className="create">Create+</button>} />
            </div>
            <div className="inputdata">
                <div className="title">
                    <h1>Create New Diary</h1>
                </div>
                <div className="r1">
                    <h1>Title  </h1>
                    <input type="text" placeholder='Diary Name' required name='title' className="val1" value={diary.title} onChange={handleInput} />
                    {/* <input type="number" placeholder='Total Challenge Days'className="val2" /> */}
                </div>
                <textarea name="description" id="ds2" cols="30" rows="10" value={diary.description} className="desc" placeholder='Short description about the Challenge'
                required onChange={handleInput}
                ></textarea>
                <div className="submit">
                    <button onClick={handlesubmit}>Submit</button>
                </div>
            </div>
            {
                datas.map((data)=>(
                    <div className="data" key={data.id}>
                        <Link className="link" to={`/diary/${data.diaryId}`}>
                            <div className="d">
                                <h1>{data.title}</h1>
                                <p>{data.description}</p>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}