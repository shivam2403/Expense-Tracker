import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import axios from 'axios';
import { useUser } from '../../context/UserContext';



const Home = () => {
  const {user}=useUser();
  const [expenses, setExpenses]=useState([]);
  var totalExpense=0;
  const [incomes, setIncomes]=useState([]);
  var totalIncome=0;

  useEffect(()=>{
    const fetchExpense=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/expense/by-user/${user._id}`);
        console.log(res.data)
        setExpenses(res.data);
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchExpense();
  },[])

  useEffect(()=>{
    const fetchIncome=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/v1/income/by-user/${user._id}`);
        console.log(res.data)
        setIncomes(res.data);
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchIncome();
  },[])

  for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i].amount;
  }

  for(let i=0;i<incomes.length;i++){
    totalIncome += incomes[i].amount;
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className='h_wrap flex flexCol aic jcc'>
        <div className="h_top flex">
          <div className='h_card'>
            <h2>Total Expense</h2>
            <div>{`$${totalExpense}`}</div>
          </div>
          <div className='h_card'>
            <h2>Total Income</h2>
            <div>{`$${totalIncome}`}</div>
          </div>
        </div>
        <div className="h_bottom">
          <div className='h_card'>
            <h2>Total Balance</h2>
            <div>{`$${totalIncome-totalExpense}`}</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home