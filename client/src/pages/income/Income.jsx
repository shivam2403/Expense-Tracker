import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './income.css'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import { useUser } from '../../context/UserContext';
import { AiFillFileAdd } from 'react-icons/ai';

const categories=['Salary', 'Freelance', 'Gifts', 'Rental Income', 'Bonus', 'Withdrawals'];

const Income = () => {
  const [inc,setInc]=useState([]);
  const {user}=useUser();
  var total=0;

  const [open,setOpen]=useState(false);
  const [amount,setAmount]=useState(0);
  const [category,setCategory]=useState('');
  const [description,setDescription]=useState('');
  const navigate=useNavigate();

  useEffect(()=>{
    const fetchincome=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/income/by-user/${user._id}`);
        setInc(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchincome();
  },[])

  for (let i = 0; i < inc.length; i++) {
    total += inc[i].amount;
  }

  const handleAdd=async(e)=>{
    e.preventDefault();

    try {
      const res=await axios.post('http://localhost:5000/api/v1/income',{
        amount:amount,
        category:category,
        description:description,
        user:user._id,
      })

      const resp = await axios.get(`http://localhost:5000/api/v1/income/by-user/${user._id}`);
      setInc(resp.data);

      setOpen(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='income'>
      <Navbar/>
      {open && (
        <div className="i_form_wrap">
          <span onClick={(e)=>setOpen(false)}>X</span>
        <form className='i_form'>
          <input className='i_input' type="text" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
          <select className='i_input' value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          <input className='i_input' type="text" placeholder='Description' onChange={(e)=>setDescription(e.target.value)}/>
          <button className='i_btn' onClick={handleAdd}>Add</button>
        </form>
        </div>
      )}
      <div className="i_wrap">
      <div className="i_top flex aic">
          <h1>My Incomes</h1>
          <button className='i_top_btn' onClick={(e)=>setOpen(true)}>
            <span>Add Income</span>
            <AiFillFileAdd/>
          </button>
        </div>
        <div className="i_mid">
          <h2>Total:{" $"+total}</h2>
        </div>
        <ul className='i_ul_sp'>
          <li className='i_li'>Date</li>
          <li className='i_li'>Amount</li>
          <li className='i_li'>Category</li>
          <li className='i_li'>Description</li>
        </ul>
        {inc.map((e,i)=>(
          <Link to={`/income/${e._id}`} style={{textDecoration:"none", color:"inherit"}}>
          <ul className='i_ul'>
            <li className='i_li'>{new Date(e.date).toLocaleDateString()}</li>
            <li className='i_li'>{"$"+e.amount}</li>
            <li className='i_li'>{e.category}</li>
            <li className='i_li'>{e.description}</li>
          </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Income