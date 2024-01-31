const mongoose = require("mongoose");
const DailyTable = require("../models/table/DailyTable");
const Deliveryguy = require("../models/deliveryguySchema");
const CompanyWorks = require("../models/table/work/companyWorksSchema");

const getDailyTableDetails = async (socket, id) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve DailyTable by ID within the session
    const dailyTable = await DailyTable.findById(id).session(session);

    if (!dailyTable) {
      const io = getIoInstance();
      io.emit("dailyTableDetailsNotFound", { id });
      return;
    }

    const result = [];

    // Iterate over personWork array and fetch additional details
    for (const item of dailyTable.personWork) {
      const { person, work } = item;

      // Fetch details from Deliveryguy model within the session
      const deliveryGuy = await Deliveryguy.findById(person).session(session);

      // Fetch details from CompanyWorks model within the session
      const companyWorks = await CompanyWorks.findById(work).session(session);

      // Add relevant details to the result array
      result.push({
        name: deliveryGuy.fullName,
        uniqueName: deliveryGuy.uniqueName,
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
        workId: work,
      });
    }

    await session.commitTransaction();
    session.endSession();

    socket.emit("dailyTableDetailsRetrieved", {
      data: result,
      message: `DailyTable details retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    socket.emit("dailyTableDetailsError", {
      message: error.message,
    });
  }
};

module.exports = getDailyTableDetails;
