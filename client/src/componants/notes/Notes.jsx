import { useEffect, useState } from 'react';
import './notes.scss';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import StickyNotes from '../../images/notes.jpg';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Popup} from 'semantic-ui-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

export const Notes=()=>{
    // const [dropdown,setDropdown]=useState(false);
    
    // const handleDrop = (clickedId) => {
        //     setDropdown((prevState) => (prevState === clickedId ? null : clickedId));
        //   };


    const [dropdown, setDropdown] = useState([]);
    const handleDrop = (clickedId) => {
        setDropdown((prevState) => {
          if (prevState.includes(clickedId)) {
            // If the clickedId is already in the array, remove it to close the dropdown
            return prevState.filter((id) => id !== clickedId);
          } else {
            // If the clickedId is not in the array, add it to open the dropdown
            return [...prevState, clickedId];
          }
        });
      };
      
    // const notes=[
    //     {
    //         "id":1,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     },
    //     {
    //         "id":2,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world,Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     },{
    //         "id":3,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     },{
    //         "id":4,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     },{
    //         "id":5,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     },{
    //         "id":6,
    //         "date":"09/09/2023",
    //         "desc":"Nature is incredibly diverse, with millions of species of plants, animals, and microorganisms inhabiting various ecosystems around the world"
    //     }
    // ]

    const [diary,setDiary]=useState([]);
    const location = useLocation();
    const pathId=location.pathname.split('/')[2];
    // console.log(pathId);
    // const [updatelist,setUpdatelist]=useState([]);
    const [input,setInput]=useState('');
    useEffect(()=>{
        try{
            const fetchdata=async()=>{
                const res=await axios.get(`http://localhost:8080/diary/${pathId}`)
                setDiary(res.data?.diaryList);
            }
            fetchdata();
        }
        catch(err)
        {
            console.log(err);
        }
    },[pathId,diary])
    // setUpdatelist(prev=>[...prev,input])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post(`http://localhost:8080/diary/${pathId}`,{input},{
                withCredentials:true
            })
            setInput('')
        }
        catch(err)
        {
            console.log(err);
        }
    }
   



    return (
        <div className="notess">
            <img src={StickyNotes} alt="" className="stickynotess" />
            <div className="abouts">
                    <h1>Title of current notes</h1>
                    <p>Nature is incredibly diverse, with millions of species of plants</p>
                </div>
            <div className="tagss">
                <div className="searchs">
                <input type="text"  placeholder='Search' />
                <SearchOutlinedIcon/>
                </div>
                <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"gray",marginBottom:"10px",marginTop:"10px"}} content=' Add New memories'  position="top center" trigger={<button className="adds" >Add+</button>} />
                {/* <button className="adds">Add Notes+ </button> */}
            </div>
            <div className="inputdata">
                <div className="title">
                    <h1>Share Your Memories Here</h1>
                </div>
                <textarea name="description" id="ds2" cols="30" rows="10" value={input} className="desc" placeholder='About your memories'
                required 
                onChange={(e)=>setInput(e.target.value)}
                ></textarea>
                <div className="submit">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            {
            diary.map((notes) => (
                <div className="snote" key={notes.id}>
                    <div className="n">
                        <h3>{ moment(notes.date).format("DD-MM-YYYY")}</h3>
                        {dropdown.includes(notes.id) ? (
                            <p>{notes.note}</p>
                            ) : (
                            <p>{notes.note.slice(0, 150)}</p>
                            )}
                        
                        {notes.note.length >=150 && <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"orangered",marginBottom:"10px",marginTop:"10px"}} content='Read more'  position="top center" trigger={<KeyboardArrowDownOutlinedIcon
                        className='dropdown'
                        onClick={() => handleDrop(notes.id)}
                        />} />}
                        {/* <KeyboardArrowDownOutlinedIcon
                        className='dropdown'
                        onClick={() => handleDrop(note.id)}
                        /> */}
                    </div>
                </div>
            ))
            }
        </div>
    )
}