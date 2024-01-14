const Branch = require("../../models/branchRelatedSchema/branchSchema");

const getAllBranchSummary = async () => {
  try {
    const branches = await Branch.find();

    const sum = branches.reduce(
      (acc, branch) => {
        acc.budget += branch.budget || 0;
        acc.totalExpense += branch.totalExpense || 0;
        acc.totalIncome += branch.totalIncome || 0;
        acc.customerNumber += branch.customerNumber || 0;
        return acc;
      },
      {
        budget: 0,
        totalExpense: 0,
        totalIncome: 0,
        customerNumber: 0,
      }
    );

    return sum;
  } catch (error) {
    console.error("Error in getAllBranchSummary:", error);
    throw error;
  }
};

module.exports = getAllBranchSummary;
