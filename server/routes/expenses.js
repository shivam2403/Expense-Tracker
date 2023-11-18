const { createExpense, getAllExpenses, getExpenseById, deleteExpense, updateExpense, getExpensesByCategory, getExpenseByUser } = require('../controllers/expense');

const router = require('express').Router();

router.post('/',createExpense);
router.get('/',getAllExpenses);
router.get('/by-user/:id',getExpenseByUser);
router.get('/cat/',getExpensesByCategory);
router.get('/:id',getExpenseById);
router.delete('/:id',deleteExpense);
router.put('/:id',updateExpense);

module.exports=router;