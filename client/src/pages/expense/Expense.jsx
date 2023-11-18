import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './expense.css'
import axios from 'axios';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import {AiFillFileAdd} from 'react-icons/ai'

const categories=['Grocery', 'Transport', 'Food', 'Clothes', 'Medicine', 'Sports', 'Technical'];

const Expense = () => {
  const {user}=useUser();
  const [exp,setExp]=useState([]);
  var total=0;
  const [open,setOpen]=useState(false);

  const [amount,setAmount]=useState(0);
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const navigate=useNavigate();

  console.log(open)
  useEffect(()=>{
    const fetchExpense=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/expense/by-user/${user._id}`);
        setExp(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchExpense();
  },[])

  for (let i = 0; i < exp.length; i++) {
    total += exp[i].amount;
  }

  const handleAdd=async(e)=>{
    e.preventDefault();

    try {
      const res=await axios.post('http://localhost:5000/api/v1/expense',{
        amount:amount,
        category:category,
        description:description,
        user:user._id,
      })

      const resp = await axios.get(`http://localhost:5000/api/v1/expense/by-user/${user._id}`);
      setExp(resp.data);

      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='expense'>
      <Navbar/>
      {open && (
        <div className="e_form_wrap">

        <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='e_form'>
          <input className='e_input' type="text" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
          <select className='e_input' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          <input className='e_input' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <button className='e_btn' onClick={handleAdd}>Add</button>
        </form>
        </div>
      )}
      <div className="e_wrap">
        <div className="e_top flex aic">
          <h1>My Expenses</h1>
          <button className='e_top_btn' onClick={(e)=>setOpen(true)}>
            <span>Add Expense</span>
            <AiFillFileAdd/>
          </button>
        </div>
        <div className="e_mid">
          <h2>Total:{" $"+total}</h2>
        </div>
        <ul className='e_ul_sp'>
          <li className='e_li'>Date</li>
          <li className='e_li'>Amount</li>
          <li className='e_li'>Category</li>
          <li className='e_li'>Description</li>
        </ul>
        {exp.map((e,i)=>(
          <Link to={`/expense/${e._id}`} style={{textDecoration:"none", color:"inherit"}}>
          <ul className='e_ul'>
            <li className='e_li'>{new Date(e.date).toLocaleDateString()}</li>
            <li className='e_li'>{"$"+e.amount}</li>
            <li className='e_li'>{e.category}</li>
            <li className='e_li'>{e.description}</li>
          </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Expense