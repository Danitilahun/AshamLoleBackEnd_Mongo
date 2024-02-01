const mongoose = require("mongoose");
const FifteenDayWorkSummary = require("../../../models/table/FifteenDayWorkSummarySchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

const getFifteenDayWorkSummary = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { tableId } = req.params;

    // Retrieve FifteenDayWorkSummary by Branch ID and Sheet ID within the session
    const workSummary = await FifteenDayWorkSummary.findById(tableId).session(
      session
    );

    if (!workSummary) {
      throw Error(
        "FifteenDayWorkSummary not found for the provided Branch ID and Sheet ID."
      );
    }

    const result = [];

    // Iterate over dailyWorkSummary array and fetch additional details
    for (const item of workSummary.dailyWorkSummary) {
      const { day, dailyWork } = item;
      // Fetch details from DailyWork model within the session
      const companyWorks = await CompanyWorks.findById(dailyWork).session(
        session
      );

      // Add relevant details to the result array
      result.push({
        name: day,
        asbezaNumber: companyWorks.asbezaNumber,
        asbezaProfit: companyWorks.asbezaProfit,
        cardCollect: companyWorks.cardCollect,
        cardDistribute: companyWorks.cardDistribute,
        cardFee: companyWorks.cardFee,
        hotelProfit: companyWorks.hotelProfit,
        waterCollect: companyWorks.waterCollect,
        waterDistribute: companyWorks.waterDistribute,
        wifiCollect: companyWorks.wifiCollect,
        wifiDistribute: companyWorks.wifiDistribute,
        total: companyWorks.total,
        id: dailyWork,
      });
    }

    console.log("d", result);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(result);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getFifteenDayWorkSummary;
