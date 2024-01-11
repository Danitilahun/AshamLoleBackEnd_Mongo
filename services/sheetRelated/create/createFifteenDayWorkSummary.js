const FifteenDayWorkSummary = require("../../models/FifteenDayWorkSummarySchema");

async function createFifteenDayWorkSummary(session, branchId, sheetId) {
  try {
    const summary = await FifteenDayWorkSummary.create(
      [
        {
          branchId: branchId,
          sheetId: sheetId,
          dailyWorkSummary: [],
        },
      ],
      { session: session }
    );

    return summary;
  } catch (error) {
    throw new Error(`Failed to create 15-Day Work Summary: ${error}`);
  }
}

module.exports = createFifteenDayWorkSummary;
