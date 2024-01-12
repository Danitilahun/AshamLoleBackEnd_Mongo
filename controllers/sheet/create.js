const Sheet = require("../../models/sheetsSchema");
const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const checkPreviousSheetStatus = require("../../services/sheetRelated/checkPreviousSheetStatus");
const { startSession } = require("mongoose");
const createCalculator = require("../../services/sheetRelated/createCalculator");
const createDeliveryGuy15DayWorkSummary = require("../../services/sheetRelated/create/createDeliveryGuy15DayWorkSummary");
const createDeliveryGuySalaryTable = require("../../services/sheetRelated/create/createDeliveryGuySalaryTable");
const createFifteenDayWorkSummary = require("../../services/sheetRelated/create/createFifteenDayWorkSummary");
const createStaffSalaryTable = require("../../services/sheetRelated/create/createStaffSalaryTable");
const updateBranchWithSession = require("../../services/sheetRelated/updateBranchWithSession");
// Create a new sheet
const createSheet = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const data = req.body;

    const prevSheetCheckResult = await checkPreviousSheet(data.sheetId);
    if (prevSheetCheckResult) {
      return res.status(400).json(prevSheetCheckResult);
    }

    const prevSheetCheck = await checkPreviousSheetStatus(data.branchId);
    if (prevSheetCheck) {
      return res.status(400).json(prevSheetCheck);
    }

    const newSheet = new Sheet(data);
    const savedSheet = await newSheet.save({ session });

    const newCalculator = await createCalculator(
      data.branchId,
      newSheet._id,
      session
    );

    const summary15Day = await createDeliveryGuy15DayWorkSummary(
      data.branchId,
      newSheet._id,
      session
    );

    const dailyWorkSummary = await createFifteenDayWorkSummary(
      data.branchId,
      newSheet._id,
      session
    );

    const deliveryGuySalary = await createDeliveryGuySalaryTable(
      data.branchId,
      newSheet._id,
      session
    );

    const staffSalary = await createStaffSalaryTable(
      data.branchId,
      newSheet._id,
      session
    );

    await updateBranchWithSession(
      data.branchId,
      {
        activeSheet: newSheet._id,
        activeCalculator: newCalculator._id,
        activeDailySummery: dailyWorkSummary._id,
        activeDGSummery: summary15Day._id,
        activeDeliverySalaryTable: deliveryGuySalary._id,
        activeStaffSalarySheet: staffSalary._id,
        sheetStatus: "Pending",
      },
      session
    );

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createSheet;
