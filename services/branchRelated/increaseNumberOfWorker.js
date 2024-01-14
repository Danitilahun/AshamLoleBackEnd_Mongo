const Branch = require("../../models/branchRelatedSchema/branchSchema");

const increaseNumberOfWorker = async (branchId, session, incrementBy = 1) => {
  try {
    const updatedBranch = await Branch.findOneAndUpdate(
      { _id: branchId },
      { $inc: { numberOfWorker: incrementBy } },
      { new: true, session }
    );

    if (!updatedBranch) {
      throw new Error("Branch not found");
    }

    return updatedBranch;
  } catch (error) {
    console.error("Error in increasing numberOfWorker:", error);
    throw error;
  }
};

module.exports = increaseNumberOfWorker;
