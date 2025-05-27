import React from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  let userName = sessionStorage.getItem('userName')
 const navigate = useNavigate();

  const handleLogOutUser =()=>{
    sessionStorage.clear()
    navigate('/');
  }
  return (
    <div className='headerMainContainer'>
        <div style={{margin:'0px 15px'}}>
            <p className='headerName'>Task Application</p>
        </div>
        <div style={{margin:'0px 15px'}}>
            <span style={{color:'#fff'}}>{userName}</span>
            <button onClick={handleLogOutUser} className='headerLogOutBtn'>Log Out</button>
        </div>
    </div>
  )
}

export default Header