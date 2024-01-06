const Expense = require("../../models/expenseSchema");

// Get all Expenses with Pagination
const getAllExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalDocs = await Expense.countDocuments();
    const expenses = await Expense.find().skip(skip).limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalDocs / limit),
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
