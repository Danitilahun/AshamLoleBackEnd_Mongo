const Expense = require("../../models/expenseSchema");

const getAllExpenses = async (req, res) => {
  try {
    // Fetch expenses with the desired order of fields
    const expenses = await Expense.find(
      {},
      { name: 1, amount: 1, _id: 0, unnecessaryField: 0 }
    );
    return res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllExpenses;
