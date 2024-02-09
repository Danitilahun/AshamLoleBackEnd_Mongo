const Branch = require("../../models/branchRelatedSchema/branchSchema");

const getCompanyFinancialData = async (req, res) => {
  try {
    // Retrieve all branches
    const branches = await Branch.find();

    // Calculate total expenses, total income, and net income
    let totalExpenses = 0;
    let totalIncome = 0;

    branches.forEach((branch) => {
      totalExpenses += branch.totalExpense;
      totalIncome += branch.totalIncome;
    });

    const netIncome = totalIncome - totalExpenses;

    // Construct the financial data object
    const financialData = {
      totalExpenses,
      totalIncome,
      netIncome,
    };

    res.status(200).json(financialData);
  } catch (error) {
    console.error("Error getting company financial data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = getCompanyFinancialData;
