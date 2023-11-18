const Expense=require('../models/Expense');

const createExpense=async(req,res)=>{
    try {
        const newExpense=new Expense(req.body);
        const exp=await newExpense.save();
        return res.status(200).json(exp);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllExpenses=async(req,res)=>{
    try {
        const expenses=await Expense.find();
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getExpenseById=async(req,res)=>{
    try {
        const expense=await Expense.findById(req.params.id);
        return res.status(200).json(expense);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getExpensesByCategory = async (req, res) => {
    try {
      const category = req.query.category.toString();
  
      // Validate category (optional, depending on your requirements)
      if (!category) {
        return res.status(400).json({ error: 'Category is required in the query parameters' });
      }
  
      // Fetch expenses for the specified category
      const expenses = await Expense.find({ category });
  
      return res.status(200).json(expenses);
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getExpenseByUser=async(req,res)=>{
    const user=req.params.id;
    try {
        if(!user)return res.status(500).json("Unauthorized user");

        const expenses=await Expense.find({user:user});
        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({message:error});
    }
  }

const updateExpense=async(req,res)=>{
    const {amount,category,description}=req.body;
    const expenseId=req.params.id;

    try {
        // if(user==null)return res.status(500).json({message:"Please Login to update your expense"});

        const expense=await Expense.findById({_id:expenseId});
        if(!expense) {
            return res.status(404).json("Expense not found");
        }
        
        // console.log(expense.user+'h');
        // console.log(user._id);

        // if(expense.user.toString()!==user._id.toString()){
        //     return res.status(403).json("Unauthorized access to expense");
        // }

        // console.log('hello')
        
        const updatedExp=await Expense.findByIdAndUpdate(expense._id,{
            amount,category,description
        },{new:true})

        return res.status(200).json(updatedExp);
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

const deleteExpense=async(req,res)=>{
    const user=req.session.user || null;
    const expenseId=req.params.id;

    try {
        // if(user==null)return res.status(500).json({message:"Please Login to update your expense"});

        const expense=await Expense.findById({_id:expenseId});
        if(!expense) {
            return res.status(404).json("Expense not found");
        }
        
        // if(expense.user.toString()!==user._id.toString()){
        //     return res.status(403).json("Unauthorized access to expense");
        // }

        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({ message: 'Expense has been deleted successfully' });
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports={
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpenseByUser,
}