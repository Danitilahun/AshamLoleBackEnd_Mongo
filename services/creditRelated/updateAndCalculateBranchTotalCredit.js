const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");

const updateAndCalculateBranchTotalCredit = async (branchId) => {
  try {
    // Retrieve BranchTotalCredit document by branchId
    let branchTotalCredit = await BranchTotalCredit.findOne({ branchId });

    if (!branchTotalCredit) {
      throw new Error(
        "BranchTotalCredit document not found for the given branchId"
      );
    }

    const oldTotal = branchTotalCredit.total;
    // Calculate the new total by reducing staffCredit and dailyCredit
    // Update the document with the new total and reduced staffCredit, dailyCredit
    await BranchTotalCredit.findOneAndUpdate(
      { branchId },
      {
        staffCredit: 0,
        dailyCredit: 0,
        total:
          branchTotalCredit.total -
          branchTotalCredit.staffCredit -
          branchTotalCredit.dailyCredit,
      },
      { new: true } // Return the updated document
    );

    if (!branchTotalCredit) {
      throw new Error("Error updating BranchTotalCredit document");
    }

    // Return the calculated total
    return oldTotal;
  } catch (error) {
    throw new Error(
      `Error updating and calculating BranchTotalCredit: ${error.message}`
    );
  }
};

module.exports = updateAndCalculateBranchTotalCredit;
