const Branch = require("../../models/branchRelatedSchema/branchSchema");

async function getTotalSummary(session) {
  try {
    // Fetch all branches using the provided session
    const branches = await Branch.find().session(session);

    // Initialize variables to hold the sums
    let totalExpense = 0;
    let totalIncome = 0;
    let totalCustomer = 0;
    let totalBudget = 0;
    let totalDeliveryGuy = 0;

    // Iterate over each branch to sum up the values
    branches.forEach((branch) => {
      totalExpense += branch.totalExpense || 0;
      totalIncome += branch.totalIncome || 0;
      totalCustomer += branch.customerNumber || 0;
      totalBudget += branch.budget || 0;
      totalDeliveryGuy += branch.numberOfWorker || 0;
    });

    // Return the aggregated totals
    return {
      totalExpense,
      totalIncome,
      totalCustomer,
      totalBudget,
      totalDeliveryGuy,
    };
  } catch (error) {
    // Handle errors
    console.error("Error fetching branches:", error);
    throw error; // Throw the error to be handled by the caller
  }
}

module.exports = getTotalSummary;
