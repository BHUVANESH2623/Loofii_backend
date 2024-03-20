import './todo.scss';
import Todoimg from '../../images/Todolist.jpg';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {Popup} from 'semantic-ui-react';
import {  useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';

export const Todo=()=>{
    const[input,setInput]=useState([{
        title:"",
        todoList:[]
    }]);

    const handleInput=e=>{
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const {title,todoList}=input;
            await axios.post('http://localhost:8080/todo',{
                title,todoList
            },{withCredentials:true})
        }
        catch(err)
        {
            console.log(err);
        }
    }

      const handleItemCompletion = (todoIndex, itemIndex) => {
        const updatedTodolist = [...todolist];
        updatedTodolist[todoIndex].list[itemIndex].completed = !updatedTodolist[todoIndex].list[itemIndex].completed;
        setTodolist(updatedTodolist);
        // Update the state or perform any necessary actions
        // For React, you should typically use state to manage data changes
        // This is just an example of how to toggle the completed property
    };

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

      const [addtask,setAddtask]=useState(false);  
      const [addtodo,setAddtodo]=useState(false); 
     
    return (
        <div className="todo">
            <img src={Todoimg} alt=""  className='todoimg'/>
            <div className="tagss">
                <div className="searchs">
                <input type="text"  placeholder='Search' />
                <SearchOutlinedIcon/>
                </div>
                <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"gray",marginBottom:"10px",marginTop:"10px"}} content=' Add New tasks'  position="top center" trigger={<button className="adds" onClick={()=>setAddtask(!addtask)} >Add Tasks+</button>} />
                {/* <button className="adds">Add Notes+ </button> */}
            </div>
            {
                addtask && 
                <div className="inputdata">
                <div className="title">
                    <h1>Create New Task</h1>
                </div>
                <div className="r1">
                    <h1>Title  </h1>
                    <input type="text" placeholder='Task Name' name='title' value={todolist.title} className="val1" onChange={handleInput} />
                    {/* <input type="number" placeholder='Total Challenge Days'className="val2" /> */}
                </div>
                {/* <textarea name="desc" id="ds2" cols="30" rows="10" className="desc" placeholder='Short description about the Challenge'></textarea> */}
                <div className="submit">
                    <button onClick={()=>setAddtask(!addtask)}>Submit</button>
                </div>
            </div>
            }
            <div className="abouts">
                <h1>Todo List</h1>
                <p>Nature is incredibly diverse, with millions of species of plants</p>
            </div>
            {
                todolist.map((todo,index)=>(
                    <div className="todolist" key={index}>
                        <div className="t">
                            <div className="tags">
                                <div className="tag">
                                    <h1>{todo.title}</h1>
                                    <h4>{todo.date}</h4>     
                                </div>
                                <button className='adds' onClick={()=>setAddtodo(!addtodo)}>Add Todo </button>       
                            </div>
                            {
                                addtodo && 
                                <div className="ins" key={index}>
                                    <input type="text" placeholder='Add task'  />
                                    <button className="ad" onClick={()=>setAddtodo(!addtodo)}>Add+</button>
                                </div>
                            }
                            {
                                dropdown.includes(index) ? todo.list.map((item, itemIndex) => (
                                    <div className="do" key={itemIndex}>
                                        <input className='checkbox'
                                            type="checkbox"
                                            name={`completed-${itemIndex}`} // Use a unique name for each task
                                            checked={item.completed}
                                            onChange={() => handleItemCompletion(index, itemIndex)}
                                        />
                                        <label>{item.name}</label>
                                    </div>
                                    )) : todo.list.slice(0,5).map((item, itemIndex) => (
                                        <div className="do" key={itemIndex}>
                                            <input className='checkbox'
                                                type="checkbox"
                                                name={`completed-${itemIndex}`} // Use a unique name for each task
                                                checked={item.completed}
                                                onClick={() => handleItemCompletion(index, itemIndex)}
                                            />
                                            <label>{item.name}</label>
                                        </div>
                                        ))
                            }
                           {
                            todo.list.length > 5 && 
                             <div className="drop">
                                <Popup style={{color:"white",border:"none",borderRadius:"5px",padding:"7.5px",backgroundColor:"gray",marginBottom:"5px",marginTop:"5px"}} content='View more'  position="top center" trigger={<KeyboardArrowDownOutlinedIcon
                                className='dropdown'
                                onClick={() => handleDrop(index)}
                                />} />
                            </div>
                           }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}