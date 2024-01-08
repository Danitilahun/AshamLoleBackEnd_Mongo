const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");

const updateCredit = async (branchId, creditType, amount, session) => {
  try {
    const updateField = {}; // Object to hold the field to be updated dynamically

    // Determine the field to update and set the value for the atomic operation
    switch (creditType) {
      case "customerCredit":
        updateField.customerCredit = amount;
        break;
      case "dailyCredit":
        updateField.dailyCredit = amount;
        break;
      case "staffCredit":
        updateField.staffCredit = amount;
        break;
      default:
        throw new Error(`Invalid credit type '${creditType}'.`);
    }

    // Perform the atomic update using $inc and apply the session
    const updatedCredit = await BranchTotalCredit.findOneAndUpdate(
      { branchId },
      { $inc: { ...updateField, total: amount } }, // Using $inc to update the specified field and 'total'
      { new: true, session } // To return the updated document and use the provided session
    );

    if (!updatedCredit) {
      throw new Error(
        "BranchTotalCredit document not found for the given branchId."
      );
    }

    return updatedCredit;
  } catch (error) {
    console.error(
      `Error updating ${creditType} for branch ${branchId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateCredit;
