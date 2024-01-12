const updateDeliveryGuy15DayWorkSummary = require("../../../../services/sheetRelated/update/updateDeliveryGuy15DayWorkSummary");
const updateFieldInFifteenDayWorkSummary = require("../../../../services/sheetRelated/update/updateFieldInFifteenDayWorkSummary");
const CardFee = async (data, session) => {
  try {
    // First update: Update the "tables" collection with cardFee: 1

    await updateDailyTableEntry(
      data.activeTable,
      data.deliveryguyId,
      "cardFee",
      1,
      0,
      session
    );

    // Second update: Change the 15 days summary and daily summary tables

    await updateDeliveryGuy15DayWorkSummary(
      data.activeDailySummery,
      data.deliveryguyId,
      "cardFee",
      1,
      0,
      session
    );

    // Third update: Individual person's daily work summary

    await updateFieldInFifteenDayWorkSummary(
      session,
      data.activeDGSummery,
      data.deliveryguyId,
      "cardFee",
      1,
      0
    );
  } catch (error) {
    console.error("Error in updateDeliveryAndDashboard:", error);
    throw error;
  }
};

module.exports = CardFee;
