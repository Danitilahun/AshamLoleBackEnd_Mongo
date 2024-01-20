const Branch = require("../../models/branchRelatedSchema/branchSchema");

// Update arbitrary fields in the Branch model
const updateBranchFields = async (id, updatedFields, session) => {
  try {
    // Use the provided session to ensure data consistency
    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, session }
    );

    if (!updatedBranch) {
      throw new Error(`Branch with id '${id}' not found`);
    }

    return updatedBranch;
  } catch (error) {
    throw error;
  }
};

module.exports = updateBranchFields;
