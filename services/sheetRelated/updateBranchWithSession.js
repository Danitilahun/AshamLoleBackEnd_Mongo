const Branch = require("./path_to_your_Branch_model");
const mongoose = require("mongoose");

async function updateBranchWithSession(branchId, updateObject, session) {
  try {
    const branch = await Branch.findById(branchId).session(session);

    if (!branch) {
      throw new Error("Branch not found");
    }

    // Update the specified properties from the updateObject
    Object.keys(updateObject).forEach((key) => {
      if (branch[key] !== undefined) {
        branch[key] = updateObject[key];
      }
    });

    // Save the updated branch within the provided session
    await branch.save({ session });
    return { success: true, message: "Branch updated successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = updateBranchWithSession;
