const Branch = require("../../models/branchRelatedSchema/branchSchema");

const increaseCustomerNumber = async (branchId, session, incrementBy = 1) => {
  try {
    const updatedBranch = await Branch.findOneAndUpdate(
      { _id: branchId },
      { $inc: { customerNumber: incrementBy } },
      { new: true, session }
    );

    if (!updatedBranch) {
      throw new Error("Branch not found");
    }

    return updatedBranch;
  } catch (error) {
    console.error("Error in increasing customerNumber:", error);
    throw error;
  }
};

module.exports = increaseCustomerNumber;
