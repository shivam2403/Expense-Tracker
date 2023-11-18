import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './singleIncome.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { useUser } from '../../context/UserContext';

const categories=['Salary', 'Freelance', 'Gifts', 'Rental Income', 'Bonus', 'Withdrawals'];

const SingleIncome = () => {
  const [income,setincome]=useState();
  const {id}=useParams();
  const [open,setOpen]=useState(false);
  const [openDelete,setOpenDelete]=useState(false);
  const [amount,setAmount]=useState(0);
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchincome=async(req,res)=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/income/${id}`);
        setincome(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchincome();
  },[open])

  const handleUpdate=async(e)=>{
    e.preventDefault();

    try {
      console.log(id);
      const res=await axios.put(`http://localhost:5000/api/v1/income/${id}`,{
        amount:amount,
        category:category,
        description:description,
      })
      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete=async()=>{

    try {
      await axios.delete(`http://localhost:5000/api/v1/income/${id}`);
      setOpenDelete(false);
      navigate('/income');    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='si'>
      <Navbar/>
      {open && (
        <div className="si_form_wrap2">
          <h2>Update Your Income</h2>
          <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='si_form2'>
          <input className='si_input2' type="text" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
          <select className='si_input2' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Change Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          <input className='si_input2' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <button className='si_btn2' onClick={handleUpdate}>Update</button>
        </form>
        </div>
      )}

{openDelete && (
        <div className="si_form_wrap3 flex flexCol">
          <span className='si_form_wrap3_span'>Do you want to delete this Income?</span>
          <div className='si_btns'>
            <button className='si_btn' onClick={handleDelete}>Yes</button>
            <button className='si_btn' onClick={(e)=>setOpenDelete(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className='si_top flex aic jcsb'>
        <h2 style={{alignSelf:"flex-start", marginLeft:"50px",marginTop:"20px"}}>Income Id: {income?._id}</h2>
        <div className="si_icons">
          <BiEdit onClick={(e)=>setOpen(true)} className='si_icon'/>
          <AiFillDelete onClick={(e)=>setOpenDelete(true)} className='si_icon'/>
        </div>
      </div>
      <div className="si_wrap">
        <div className="si_form_wrap">
          <h1 style={{marginLeft:"20vw"}}>Details</h1>
          <form className='si_form'>
            <ul className='si_ul flex flexCol'>
              <li className='si_li flex'>
                <h2>Date:</h2>
                <h2>{new Date(income?.date).toLocaleDateString()}</h2>
              </li>
              <li className='si_li flex'>
                <h2>Amount:</h2>
                <h2>{"$"+income?.amount}</h2>
              </li>
              <li className='si_li flex'>
                <h2>Category:</h2>
                <h2>{income?.category}</h2>
              </li>
              <li className='si_li flex'>
                <h2>Description:</h2>
                <h2>{income?.description}</h2>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SingleIncome;