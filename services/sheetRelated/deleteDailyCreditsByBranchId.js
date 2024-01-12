const {
  DailyCredit,
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../models/credit/dailyCreditSchema");
// Function to delete all staffCredits with a given branchId
const deleteStaffCreditsByBranchId = async (branchId, session) => {
  try {
    // Delete staffCredits from DailyCredit collection
    await DailyCredit.deleteMany({ branchId, source: "staffCredit" }).session(
      session
    );

    // Delete staffCredits from DailyExpenseCredit collection
    await DailyExpenseCredit.deleteMany({
      branchId,
    }).session(session);

    // Delete staffCredits from DailyGainCredit collection
    await DailyGainCredit.deleteMany({
      branchId,
      source: "staffCredit",
    }).session(session);

    return { message: "StaffCredits deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting staffCredits: ${error.message}`);
  }
};

module.exports = deleteStaffCreditsByBranchId;
