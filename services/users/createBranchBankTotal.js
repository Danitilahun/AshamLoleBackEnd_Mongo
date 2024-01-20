const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");

async function createBranchBankTotal(session, data) {
  try {
    // Create the BranchBankTotal document within the provided session
    const branchBankTotal = await BranchBankTotal.create([data], { session });

    return branchBankTotal[0]; // Assuming create returns an array, return the first element
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createBranchBankTotal;
