const StaffCredit = require("../models/staffCreditSchema");

const deleteStaffCreditsByBranchId = async (branchId) => {
  try {
    const deleteResult = await StaffCredit.deleteMany({ branchId });
    return deleteResult;
  } catch (error) {
    throw new Error(`Error deleting staff credits: ${error.message}`);
  }
};

module.exports = deleteStaffCreditsByBranchId;
