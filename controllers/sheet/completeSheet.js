const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const deleteDailyCreditsByBranchId = require("../../services/sheetRelated/deleteDailyCreditsByBranchId");
const deleteStaffCreditsByBranchId = require("../../services/sheetRelated/deleteStaffCreditsByBranchId");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");

const ChangeSheetStatus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const data = req.body;

    const prevSheetCheckResult = await checkPreviousSheet(data.sheetId);
    if (prevSheetCheckResult) {
      return res.status(400).json(prevSheetCheckResult);
    }

    await updateBranchWithSession(
      data.branchId,
      {
        activeSheet: "",
        activeCalculator: "",
        activeDailySummery: "",
        activeDGSummery: "",
        activeDeliverySalaryTable: "",
        activeStaffSalarySheet: "",
        sheetStatus: "Pending",
      },
      session
    );

    await deleteStaffCreditsByBranchId(branchId);
    await deleteDailyCreditsByBranchId(branchId, session);

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
      message: `Sheet status successfully changed to Completed.`,
    });
  } catch (error) {
    console.error(error);

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = ChangeSheetStatus;
