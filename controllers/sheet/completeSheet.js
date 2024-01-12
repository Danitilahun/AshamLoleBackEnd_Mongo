const updateAndCalculateBranchTotalCredit = require("../../services/creditRelated/updateAndCalculateBranchTotalCredit");
const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const deleteDailyCreditsByBranchId = require("../../services/sheetRelated/deleteDailyCreditsByBranchId");
const deleteSheetRelatedDocumentsByBranchId = require("../../services/sheetRelated/deleteSheetRelatedDocumentsByBranchId");
const deleteStaffCreditsByBranchId = require("../../services/sheetRelated/deleteStaffCreditsByBranchId");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");
const calculateAndUpdateTotalDeliveryGuySalaryTable = require("../../services/total/calculateAndUpdateTotalDeliveryGuySalaryTable");
const calculateAndUpdateTotalStaffSalaryTable = require("../../services/total/calculateAndUpdateTotalStaffSalaryTable");
const calculateCompanyWorkTotal = require("../../services/total/calculateCompanyWorkTotal");

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

    await deleteSheetRelatedDocumentsByBranchId(branchId, session);

    const totalCredit = await updateAndCalculateBranchTotalCredit(
      data.branchId,
      session
    );

    const totalStaffInfo = await calculateAndUpdateTotalStaffSalaryTable(
      data.branchId,
      data.sheetId,
      session
    );

    const totalDeliveryGuyInfo =
      await calculateAndUpdateTotalDeliveryGuySalaryTable(
        data.branchId,
        data.sheetId,
        session
      );

    const totalSummeryInfo = await calculateCompanyWorkTotal(
      data.branchId,
      data.sheetId,
      session
    );

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
