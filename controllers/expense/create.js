const Expense = require("../../models/expenseSchema");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const { amount, financeId, name } = req.body;
    const newExpense = new Expense({ amount, financeId, name });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createExpense;
