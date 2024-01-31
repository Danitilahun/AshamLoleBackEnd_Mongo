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
const { getIoInstance } = require("../../socket");

const createSheet = async (req, res) => {
  const session = await startSession();
  session.startTransaction();
  const io = getIoInstance();
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
      session,
      data.branchId,
      newSheet._id
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

    console.log(newSheet);

    console.log(dailyWorkSummary);
    newSheet.activeDailySummery = dailyWorkSummary[0]._id;
    newSheet.activeDGSummery = summary15Day._id;

    console.log("newSheet", newSheet);
    const savedSheet = await newSheet.save({ session });
    await updateBranchWithSession(
      data.branchId,
      {
        activeSheet: savedSheet._id,
        activeCalculator: newCalculator._id,
        activeDailySummery: dailyWorkSummary[0]._id,
        activeDGSummery: summary15Day._id,
        activeDeliverySalaryTable: deliveryGuySalary._id,
        activeStaffSalarySheet: staffSalary._id,
        sheetStatus: "Pending",
      },
      session
    );
    // Commit the transaction if successful
    await session.commitTransaction();
    io.emit("sheetCreated", savedSheet);
    session.endSession();
    res.status(201).json({
      success: true,
      message: "Sheet created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = createSheet;
