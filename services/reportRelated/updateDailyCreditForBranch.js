const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");

const updateDailyCreditForBranch = async (branchId, value) => {
  try {
    // Update the dailyCredit for the given branchId using $inc
    const updatedBranchCredit = await BranchTotalCredit.findOneAndUpdate(
      { branchId },
      { $inc: { dailyCredit: value } },
      { new: true } // To return the updated document
    );

    if (!updatedBranchCredit) {
      throw new Error(
        "Branch credit details not found for the given branchId."
      );
    }

    return updatedBranchCredit;
  } catch (error) {
    console.error(`Error updating dailyCredit for branch ${branchId}:`, error);
    throw error;
  }
};

module.exports = updateDailyCreditForBranch;
