const updateDeliveryGuy15DayWorkSummary = require("../../../../services/sheetRelated/update/updateDeliveryGuy15DayWorkSummary");
const updateFieldInFifteenDayWorkSummary = require("../../../../services/sheetRelated/update/updateFieldInFifteenDayWorkSummary");
const updateDailyTableEntry = require("../../../../services/tableRelated/updateDailyTableEntry");

const HotelProfit = async (data, session) => {
  try {
    // First update: Update the "tables" collection with cardFee: 1

    await updateDailyTableEntry(
      data.activeTable,
      data.deliveryguyId,
      "hotelProfit",
      parseFloat(data.amount),
      parseFloat(data.amount),
      session
    );

    // Second update: Change the 15 days summary and daily summary tables

    await updateDeliveryGuy15DayWorkSummary(
      data.activeDailySummery,
      data.deliveryguyId,
      "hotelProfit",
      parseFloat(data.amount),
      parseFloat(data.amount),
      session
    );

    // Third update: Individual person's daily work summary

    await updateFieldInFifteenDayWorkSummary(
      session,
      data.activeDGSummery,
      data.date,
      "hotelProfit",
      parseFloat(data.amount),
      parseFloat(data.amount)
    );
  } catch (error) {
    console.error("Error in HotelProfit:", error);
    throw error;
  }
};

module.exports = HotelProfit;
