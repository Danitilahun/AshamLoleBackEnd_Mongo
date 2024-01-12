const CompanyGain = require("../../../../models/price/companyGainSchema");
const updateStatus = require("../../../../services/reportRelated/updateStatus");
const updateDailyTableEntry = require("../../../../services/tableRelated/updateDailyTableEntry");

const CardDistribute = async (data, session) => {
  try {
    const companyGainDoc = await CompanyGain.findOne();
    const cartDistributeGain = companyGainDoc.card_distribute_gain;
    if (!companyGainDoc) {
      throw new Error(
        "Company gain information is missing.Please refresh your browser and try again."
      );
    }

    // First update: Change the daily table

    await updateDailyTableEntry(
      data.activeTable,
      data.deliveryguyId,
      "cardDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.card_distribute_gain,
      session
    );

    // Second update: Change the 15 days summary and daily summary tables

    await updateDeliveryGuy15DayWorkSummary(
      data.activeDailySummery,
      data.deliveryguyId,
      "cardDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.card_distribute_gain,
      session
    );

    // Third update: Individual person's daily work summary

    await updateFieldInFifteenDayWorkSummary(
      session,
      data.activeDGSummery,
      data.deliveryguyId,
      "cardDistribute",
      data.numberOfCard,
      data.numberOfCard * cartDistributeGain.card_distribute_gain
    );
  } catch (error) {
    console.error("Error in CardFee:", error);
    throw error;
  }
};

module.exports = CardDistribute;
