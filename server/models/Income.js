const { default: mongoose } = require("mongoose");

const IncomeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        enum: ['Salary', 'Freelance', 'Gifts', 'Rental Income', 'Bonus', 'Withdrawals'],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

module.exports=mongoose.model("Income",IncomeSchema);