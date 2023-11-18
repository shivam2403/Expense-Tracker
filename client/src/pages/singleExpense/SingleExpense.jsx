import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './singleExpense.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { useUser } from '../../context/UserContext';

const categories=['Grocery', 'Transport', 'Food', 'Clothes', 'Medicine', 'Sports', 'Technical'];

const SingleExpense = () => {
  const [expense,setExpense]=useState();
  const {id}=useParams();
  const [open,setOpen]=useState(false);
  const [openDelete,setOpenDelete]=useState(false);
  const [amount,setAmount]=useState(0);
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchExpense=async(req,res)=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/expense/${id}`);
        setExpense(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchExpense();
  },[open])

  const handleUpdate=async(e)=>{
    e.preventDefault();

    try {
      console.log(id);
      const res=await axios.put(`http://localhost:5000/api/v1/expense/${id}`,{
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
      await axios.delete(`http://localhost:5000/api/v1/expense/${id}`);
      setOpenDelete(false);
      navigate('/expense');    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='se'>
      <Navbar/>
      {open && (
        <div className="se_form_wrap2 flex flexCol">
          <h2>Update Your Expense</h2>
          <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='se_form2'>
          <input className='se_input2' type="text" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
          <select className='se_input2' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Change Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          <input className='se_input2' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <button className='se_btn2' onClick={handleUpdate}>Update</button>
        </form>
        </div>
      )}

{openDelete && (
        <div className="se_form_wrap3 flex flexCol">
          <span className='se_form_wrap3_span'>Do you want to delete this expense?</span>
          <div className='se_btns'>
            <button className='se_btn' onClick={handleDelete}>Yes</button>
            <button className='se_btn' onClick={(e)=>setOpenDelete(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className='se_top flex aic jcsb'>
        <h2 style={{alignSelf:"flex-start", marginLeft:"50px",marginTop:"20px"}}>Expense Id: {expense?._id}</h2>
        <div className="se_icons">
          <BiEdit onClick={(e)=>setOpen(true)} className='se_icon'/>
          <AiFillDelete onClick={(e)=>setOpenDelete(true)} className='se_icon'/>
        </div>
      </div>
      <div className="se_wrap">
        <div className="se_form_wrap">
          <h1 style={{marginLeft:"20vw"}}>Details</h1>
          <form className='se_form'>
            <ul className='se_ul flex flexCol'>
              <li className='se_li flex'>
                <h2>Date:</h2>
                <h2>{new Date(expense?.date).toLocaleDateString()}</h2>
              </li>
              <li className='se_li flex'>
                <h2>Amount:</h2>
                <h2>{"$"+expense?.amount}</h2>
              </li>
              <li className='se_li flex'>
                <h2>Category:</h2>
                <h2>{expense?.category}</h2>
              </li>
              <li className='se_li flex'>
                <h2>Description:</h2>
                <h2>{expense?.description}</h2>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SingleExpense;