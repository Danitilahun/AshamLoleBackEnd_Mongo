const Expense = require("../../models/expenseSchema");

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.status(200).json(deletedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteExpense;
