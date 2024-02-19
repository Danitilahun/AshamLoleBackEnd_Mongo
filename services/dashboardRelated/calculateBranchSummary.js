const mongoose = require("mongoose");
const getDeliveryGuyWorkSummary = require("./getDeliveryGuyWorkSummary");

async function calculateBranchSummary(branches, session) {
  const branchSummaries = [];

  for (const branch of branches) {
    try {
      // Get the delivery guy work summary for the branch
      const deliveryGuyWorkSummary = await getDeliveryGuyWorkSummary(
        branch.tableId,
        session
      );

      // Calculate total income, expense, and their difference
      let totalIncome = 0;
      let totalExpense = 0;
      let totalNumericSum = 0;
      let difference = 0;

      for (const item of deliveryGuyWorkSummary) {
        totalIncome += item.total || 0;
        totalExpense += item.totalExpense || 0;
        for (const [key, value] of Object.entries(item)) {
          if (typeof value === "number") {
            totalNumericSum += value;
          }
        }
      }

      difference = totalIncome - totalExpense;

      // Add branch name, unique name, total income, total expense, difference, and total numeric sum to the summary
      branchSummaries.push({
        branchName: branch.name,
        uniqueName: branch.uniqueName,
        totalIncome,
        totalExpense,
        difference,
        totalNumericSum,
      });
    } catch (error) {
      console.error(`Error processing branch ${branch.name}:`, error);
      throw error;
    }
  }

  return branchSummaries;
}

module.exports = calculateBranchSummary;
