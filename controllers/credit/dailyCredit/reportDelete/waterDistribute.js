const CompanyGain = require("../../../../models/price/companyGainSchema");
const updateDeliveryGuy15DayWorkSummary = require("../../../../services/sheetRelated/update/updateDeliveryGuy15DayWorkSummary");
const updateFieldInFifteenDayWorkSummary = require("../../../../services/sheetRelated/update/updateFieldInFifteenDayWorkSummary");
const updateDailyTableEntry = require("../../../../services/tableRelated/updateDailyTableEntry");

const waterDistribute = async (data, session) => {
  try {
    const companyGainDoc = await CompanyGain.findOne();
    const waterDistributeGain = companyGainDoc.water_distribute_gain;
    if (!waterDistributeGain) {
      throw new Error(
        "Company gain information is missing. Please refresh your browser and try again."
      );
    }

    // First update: Change the daily table
    await updateDailyTableEntry(
      data.activeTable,
      data.deliveryguyId,
      "waterDistribute",
      data.numberOfCard,
      data.numberOfCard * waterDistributeGain,
      session
    );

    // Second update: Change the 15 days summary and daily summary tables
    await updateDeliveryGuy15DayWorkSummary(
      data.activeDailySummery,
      data.deliveryguyId,
      "waterDistribute",
      data.numberOfCard,
      data.numberOfCard * waterDistributeGain,
      session
    );

    // Third update: Individual person's daily work summary
    await updateFieldInFifteenDayWorkSummary(
      session,
      data.activeDGSummery,
      data.date,
      "waterDistribute",
      data.numberOfCard,
      data.numberOfCard * waterDistributeGain
    );
  } catch (error) {
    console.error("Error in waterDistribute:", error);
    throw error;
  }
};

module.exports = waterDistribute;
