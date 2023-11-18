import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const {user,login}=useUser();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  console.log(user);

  useEffect(()=>{
    if(user)navigate('/');
  },[])

  const handleLogin=async(e)=>{
    e.preventDefault();

    try {
      // console.log('hhh');
      const response=await axios.post("http://localhost:5000/api/v1/auth/login",{
        email,
        password,
      })
  
      // console.log('rrr')
      // console.log(response.data)
      login(response.data);
  
      navigate('/');
    } catch (error) {
      console.log("Login failed",error); 
    }
  }

  return (
    <div className='login'>
      <h1>Log In</h1>
      <div className="l_wrap">
        <div className="l_left">
          <img className='l_logo' src="https://cdn.dribbble.com/users/406297/screenshots/10948333/media/010fc69f018efd96e75b03002a3354b7.gif" alt="Logo" />
        </div>
        <div className="l_right">
          <form className='l_form'>
            <input className='l_input' type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input className='l_input' type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className='l_btn' onClick={handleLogin}>Login</button>
            <span>Or</span>
            <Link to={'/register'} className='l_sgn'>
              SignUp
            </Link>
          </form>
      </div>
    </div>
    </div>
  )
}

export default Login