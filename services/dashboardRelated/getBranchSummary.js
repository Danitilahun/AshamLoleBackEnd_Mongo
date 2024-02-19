const Branch = require("../../models/branchRelatedSchema/branchSchema");

async function getBranchSummary(session) {
  try {
    // Fetch all branches using the provided session
    const branches = await Branch.find().session(session);

    // Initialize an array to hold the branch summaries
    const branchSummaries = [];

    // Iterate over each branch to extract the required information
    branches.forEach((branch) => {
      // Extract the required fields and create a summary object
      const branchSummary = {
        name: branch.name,
        id: branch._id, // Assuming the ID field should be the MongoDB ObjectId
        totalIncome: branch.totalIncome || 0,
        uniqueName: branch.uniqueName,
      };

      // Push the branch summary to the array
      branchSummaries.push(branchSummary);
    });

    // Return the array of branch summaries
    return branchSummaries;
  } catch (error) {
    // Handle errors
    console.error("Error fetching branches:", error);
    throw error; // Throw the error to be handled by the caller
  }
}

module.exports = getBranchSummary;
