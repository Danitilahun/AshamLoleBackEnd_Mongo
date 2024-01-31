const mongoose = require("mongoose");
const FifteenDayWorkSummary = require("../models/table/FifteenDayWorkSummarySchema");
const CompanyWorks = require("../models/table/work/companyWorksSchema");

const getFifteenDayWorkSummary = async (socket, tableId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("tableId", tableId);
    // Retrieve FifteenDayWorkSummary by Branch ID and Sheet ID within the session
    const workSummary = await FifteenDayWorkSummary.findById(tableId).session(
      session
    );

    if (!workSummary) {
      socket.emit("fifteenDayWorkSummaryData", {
        success: false,
        message:
          "FifteenDayWorkSummary not found for the provided Branch ID and Sheet ID.",
      });
      return;
    }

    const result = [];

    // Iterate over dailyWorkSummary array and fetch additional details
    for (const item of workSummary.dailyWorkSummary) {
      const { day, dailyWork } = item;
      console.log("daily work", dailyWork);

      // Fetch details from DailyWork model within the session
      const companyWorks = await CompanyWorks.findById(dailyWork).session(
        session
      );

      console.log("companyWorks", companyWorks);

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

    console.log("result from fdw", result);

    await session.commitTransaction();
    session.endSession();

    socket.emit("fifteenDayWorkSummaryData", {
      success: true,
      data: result,
      message: `FifteenDayWorkSummary details retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    socket.emit("fifteenDayWorkSummaryData", {
      success: false,
      message: error.message,
    });
  }
};

module.exports = getFifteenDayWorkSummary;
