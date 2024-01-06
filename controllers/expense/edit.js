const Expense = require("../../models/expenseSchema");

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, financeId, name } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, financeId, name },
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateExpense;
