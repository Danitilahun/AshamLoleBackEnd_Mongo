const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");

const ChangeSheetStatus = async (req, res) => {
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

    res.status(200).json({
      message: `Sheet status successfully changed to Completed.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = ChangeSheetStatus;
