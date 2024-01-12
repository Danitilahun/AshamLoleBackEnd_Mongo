const CompanyGain = require("../../../../models/price/companyGainSchema");
const updateDeliveryGuy15DayWorkSummary = require("../../../../services/sheetRelated/update/updateDeliveryGuy15DayWorkSummary");
const updateFieldInFifteenDayWorkSummary = require("../../../../services/sheetRelated/update/updateFieldInFifteenDayWorkSummary");
const updateDailyTableEntry = require("../../../../services/tableRelated/updateDailyTableEntry");

const wifiDistribute = async (data, session) => {
  try {
    const companyGainDoc = await CompanyGain.findOne();
    const wifiDistributeGain = companyGainDoc.wifi_distribute_gain;
    if (!wifiDistributeGain) {
      throw new Error(
        "Company gain information is missing.Please refresh your browser and try again."
      );
    }

    // First update: Change the daily table

    await updateDailyTableEntry(
      data.activeTable,
      data.deliveryguyId,
      "wifiDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.wifi_distribute_gain,
      session
    );

    // Second update: Change the 15 days summary and daily summary tables

    await updateDeliveryGuy15DayWorkSummary(
      data.activeDailySummery,
      data.deliveryguyId,
      "wifiDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.wifi_distribute_gain,
      session
    );

    // Third update: Individual person's daily work summary

    await updateFieldInFifteenDayWorkSummary(
      session,
      data.activeDGSummery,
      data.date,
      "wifiDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.wifi_distribute_gain
    );
  } catch (error) {
    console.error("Error in wifiDistribute:", error);
    throw error;
  }
};

module.exports = wifiDistribute;
