const Branch = require("../../models/branchRelatedSchema/branchSchema");

// Import the Branch model

async function updateBranchManager(branchId, managerId, session) {
  try {
    // Use the provided session for the update operation
    const options = { session };

    console.log("branchId", branchId);
    // Find the branch by ID and update the managerName and managerId fields
    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      { $set: { managerId } },
      { new: true, ...options } // Return the updated document
    );

    console.log("updatedBranch", updatedBranch);
    if (!updatedBranch) {
      throw new Error("Branch not found");
    }

    return updatedBranch;
  } catch (error) {
    throw new Error(`Failed to update branch: ${error.message}`);
  }
}

module.exports = updateBranchManager;
