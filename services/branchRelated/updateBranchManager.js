const Branch = require("../../models/branchRelatedSchema/branchSchema");

// Import the Branch model

async function updateBranchManager(branchId, managerName, managerId, session) {
  try {
    // Use the provided session for the update operation
    const options = { session };

    // Find the branch by ID and update the managerName and managerId fields
    const updatedBranch = await Branch.findByIdAndUpdate(
      branchId,
      { $set: { managerName, managerId } },
      { new: true, ...options } // Return the updated document
    );

    if (!updatedBranch) {
      throw new Error("Branch not found");
    }

    return updatedBranch;
  } catch (error) {
    throw new Error(`Failed to update branch: ${error.message}`);
  }
}

module.exports = updateBranchManager;
