import './navbar.scss';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
// import { useEffect, useRef } from 'react';

export const Navbar = () => {
  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/auth/logout");
      await axios.post("http://localhost:8080/auth/logout");
    } catch (err) {
      console.log(err.response.message);
    }
  }

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const delayHoverDisappearance = (element, menu, delayMilliseconds) => {
//       let timeoutId;

//       function showMenu() {
//         // Clear any existing timeout
//         clearTimeout(timeoutId);

//         // Show the dropdown menu
//         menu.style.display = 'block';
//       }

//       function hideMenu() {
//         // Set a timeout to hide the menu after delayMilliseconds
//         timeoutId = setTimeout(() => {
//           menu.style.display = 'none';
//         }, delayMilliseconds);
//       }

//       element.addEventListener('mouseenter', showMenu);
//       element.addEventListener('mouseleave', hideMenu);

//       if (element.classList.contains('tooltip')) {
//         // Only add the event listeners for "Bhuvanesh" and "bineesh" if the element has the "tooltip" class
//         menu.addEventListener('mouseenter', showMenu);
//         menu.addEventListener('mouseleave', hideMenu);
//       }
//     };

//     const dropdownElement = dropdownRef.current;
//     const dropdownMenu = dropdownElement.querySelector('.hovertip');
//     delayHoverDisappearance(dropdownElement, dropdownMenu, 150); // Delay disappearance for 10 seconds (10000 milliseconds)
//   }, []); // Empty dependency array to run this effect once

  return (
    <div className="navbar">
      <div className="left">
        <span>
          <Link className="link" to={'/'}>
            Title
          </Link>
        </span>
      </div>
      <div className="center">
        <div className="search">
          <input type="text" placeholder='Search ...' />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="right" >
        <div className="tooltip"> 
         {/* ref={dropdownRef} */}
          <span className='dropbtn'>Bhuvanesh</span>
          <div className="hovertip">
            <span className="list">My Diary</span>
            <span className="list">My Todo</span>
            <span className="list">My Challenges</span>
            <span className="list">My Schedules</span>
          </div>
        </div>
        <div className="tooltip" >
        {/* ref={dropdownRef} */}
          <span className='dropbtn'>bineesh</span>
          <div className="hovertip">
            <span className="list">Diary</span>
            <span className="list">Todo</span>
            <span className="list">Challenges</span>
            <span className="list">Schedules</span>
          </div>
        </div>
        <span onClick={logout}>Logout</span>
      </div>
    </div>
  )
}
