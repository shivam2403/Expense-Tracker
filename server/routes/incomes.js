const { createIncome, getAllIncomes, getIncomeById, deleteIncome, updateIncome, getIncomesByCategory, getIncomeByUser } = require('../controllers/income');

const router = require('express').Router();

router.post('/',createIncome);
router.get('/',getAllIncomes);
router.get('/by-user/:id',getIncomeByUser);
router.get('/cat/',getIncomesByCategory);
router.get('/:id',getIncomeById);
router.delete('/:id',deleteIncome);
router.put('/:id',updateIncome);

module.exports=router;