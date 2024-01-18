const mongoose = require("mongoose");
const FifteenDayWorkSummary = require("../../../models/table/FifteenDayWorkSummarySchema");

const getFifteenDayWorkSummary = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, sheetId } = req.params;

    // Retrieve FifteenDayWorkSummary by Branch ID and Sheet ID within the session
    const workSummary = await FifteenDayWorkSummary.findOne({
      branchId,
      sheetId,
    }).session(session);

    if (!workSummary) {
      return res.status(404).json({
        message:
          "FifteenDayWorkSummary not found for the provided Branch ID and Sheet ID.",
      });
    }

    const result = [];

    // Iterate over dailyWorkSummary array and fetch additional details
    for (const item of workSummary.dailyWorkSummary) {
      const { day, dailyWork } = item;

      // Fetch details from DailyWork model within the session
      const dailyWorkDetails = await DailyWork.findOne({ day }).session(
        session
      );

      // Add relevant details to the result array
      result.push({
        day,
        dailyWork,
        // Add other relevant fields from DailyWork model
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `FifteenDayWorkSummary details retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getFifteenDayWorkSummary;
