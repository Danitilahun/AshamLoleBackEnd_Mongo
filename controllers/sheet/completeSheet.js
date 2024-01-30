const Branch = require("../../models/branchRelatedSchema/branchSchema");
const Sheet = require("../../models/sheetsSchema");
const Status = require("../../models/statusSchema");
const updateAndCalculateBranchTotalCredit = require("../../services/creditRelated/updateAndCalculateBranchTotalCredit");
const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const deleteSheetRelatedDocumentsByBranchId = require("../../services/sheetRelated/deleteSheetRelatedDocumentsByBranchId");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");
const calculateAndUpdateTotalDeliveryGuySalaryTable = require("../../services/total/calculateAndUpdateTotalDeliveryGuySalaryTable");
const calculateAndUpdateTotalStaffSalaryTable = require("../../services/total/calculateAndUpdateTotalStaffSalaryTable");
const calculateCompanyWorkTotal = require("../../services/total/calculateCompanyWorkTotal");
const { getIoInstance } = require("../../socket");

const ChangeSheetStatus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  const io = getIoInstance();
  try {
    const data = req.body;

    const prevSheetCheckResult = await checkPreviousSheet(data.sheetId);
    if (prevSheetCheckResult) {
      return res.status(400).json(prevSheetCheckResult);
    }

    const branch = await Branch.findById(data.branchId).session(session);

    const sheet = await Sheet.findByIdAndUpdate(
      branch.activeSheet,
      {
        sheetStatus: "Completed",
      },
      { session }
    );
    await updateBranchWithSession(
      data.branchId,
      {
        activeSheet: "",
        activeCalculator: "",
        activeDailySummery: "",
        activeDGSummery: "",
        activeDeliverySalaryTable: "",
        activeStaffSalarySheet: "",
        sheetStatus: "Completed",
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

    // Creating Status document using session
    await Status.create(
      {
        branchId: data.branchId,
        date: data.date,
        totalCredit: totalCredit,
        totalStaffSalary: totalStaffInfo.total,
        totalDeliveryGuySalary: totalDeliveryGuyInfo.total,
        totalIncome: totalSummeryInfo.total,
      },
      { session }
    );

    io.emit("sheetUpdated", sheet);
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
