import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useUser } from '../../context/UserContext'
import axios from 'axios';
import {IoIosOptions} from 'react-icons/io'
import {GiCancel} from 'react-icons/gi'
import { useState } from 'react';


const Navbar = () => {
  const {user,logout}=useUser();
  console.log(user);
  const navigate=useNavigate();
  const [open,setOpen]=useState(false);

  const handleLogout=async()=>{
    try {
      await axios.post("http://localhost:5000/api/v1/auth/logout");

      logout(user);

      navigate('/login');
    } catch (error) {
      console.log("Logout failed", error);
    }
  }

  return (
    <div className='navbar'>
      <div className="n_wrap flex jcsb aic">
        <div className="n_left flex aic">
        <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
          <img className='n_logo' src="https://s3.amazonaws.com/ionic-marketplace/smartcalc-daily-expense-tracker/icon.png" alt="Logo" />
        </Link>

          <ul className={`n_ul`}>
            <Link to={'/'} style={{textDecoration:"none",color:"inherit"}}>
              <li className='n_li'>Home</li>
            </Link>
            <Link to={'/expense'} style={{textDecoration:"none",color:"inherit"}}>
              <li className='n_li'>Expenses</li>
            </Link>
            <Link to={'/income'} style={{textDecoration:"none",color:"inherit"}}>
              <li className='n_li'>Income</li>
            </Link>
          </ul>
        </div>
        {!user ? (<div className="n_right flex aic">
          <Link to={'/login'}>
            <button className='n_btn'>Login</button>
          </Link>
          <Link to={'/register'}>
            <button className='n_btn'>SignUp</button>
          </Link>
        </div>) : (<div className="n_right flex aic">
          <button className='n_btn' onClick={handleLogout}>Logout</button>
        </div>)}
        
      </div>
    </div>
  )
}

export default Navbar