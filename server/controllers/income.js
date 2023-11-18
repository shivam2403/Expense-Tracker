const Income=require('../models/Income');

const createIncome=async(req,res)=>{
    console.log("jai shree ram")
    try {
        const newIncome=new Income(req.body);
        const inc=await newIncome.save();
        return res.status(200).json(inc);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllIncomes=async(req,res)=>{
    console.log('h')
    try {
        const incomes=await Income.find();
        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getIncomeById=async(req,res)=>{
    try {
        const income=await Income.findById(req.params.id);
        return res.status(200).json(income);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getIncomesByCategory = async (req, res) => {
    try {
      const category = req.query.category.toString();
  
      // Validate category (optional, depending on your requirements)
      if (!category) {
        return res.status(400).json({ error: 'Category is required in the query parameters' });
      }
  
      // Fetch Incomes for the specified category
      const incomes = await Income.find({ category });
  
      return res.status(200).json(incomes);
    } catch (error) {
      console.error('Error fetching Incomes by category:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getIncomeByUser=async(req,res)=>{
    const user=req.params.id;
    try {
        if(!user)return res.status(500).json("Unauthorized user");

        const incomes=await Income.find({user:user});
        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json({message:error});
    }
  }

const updateIncome=async(req,res)=>{
    const {amount,category,description}=req.body;
    const user=req.session.user || null;
    const IncomeId=req.params.id;
    // console.log(req.session.user);

    try {
        // if(user==null)return res.status(500).json({message:"Please Login to update your Income"});

        const income=await Income.findById({_id:IncomeId});
        if(!income) {
            return res.status(404).json("Income not found");
        }
        
        // console.log(Income.user+'h');
        // console.log(user._id);

        // if(income.user.toString()!==user._id.toString()){
        //     return res.status(403).json("Unauthorized access to Income");
        // }

        console.log('hello')
        const updatedExp=await Income.findByIdAndUpdate(income._id,{
            amount,category,description
        },{new:true})

        return res.status(200).json(updatedExp);
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

const deleteIncome=async(req,res)=>{
    const user=req.session.user || null;
    const IncomeId=req.params.id;

    try {
        // if(user==null)return res.status(500).json({message:"Please Login to update your Income"});

        const income=await Income.findById({_id:IncomeId});
        if(!income) {
            return res.status(404).json("Income not found");
        }
        
        // if(income.user.toString()!==user._id.toString()){
        //     return res.status(403).json("Unauthorized access to Income");
        // }

        await Income.findByIdAndDelete(IncomeId);
        return res.status(200).json({ message: 'Income has been deleted successfully' });
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports={
    getAllIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome,
    getIncomesByCategory,
    getIncomeByUser,
}