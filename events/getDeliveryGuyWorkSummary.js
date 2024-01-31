const mongoose = require("mongoose");
const DeliveryGuy15DayWorkSummary = require("../models/table/DeliveryGuy15DayWorkSummarySchema");
const Deliveryguy = require("../models/deliveryguySchema");
const CompanyWorks = require("../models/table/work/companyWorksSchema");

const getDeliveryGuyWorkSummary = async (socket, tableId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Retrieve DeliveryGuy15DayWorkSummary by tableId within the session
    const workSummary = await DeliveryGuy15DayWorkSummary.findById(
      tableId
    ).session(session);

    if (!workSummary) {
      throw new Error(
        "DeliveryGuy15DayWorkSummary not found for the provided tableId."
      );
    }

    const result = [];

    // Iterate over personWork array and fetch additional details
    for (const item of workSummary.personWork) {
      const { person, work } = item;

      // Fetch details from Deliveryguy model within the session
      const deliveryGuy = await Deliveryguy.findById(person).session(session);

      // Fetch details from CompanyWorks model within the session
      const companyWorks = await CompanyWorks.findById(work).session(session);

      // Add relevant details to the result array
      const workDetails = {
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
      };

      result.push(workDetails);
    }

    await session.commitTransaction();
    session.endSession();

    // Emit the result to the socket
    socket.emit("deliveryGuyWorkSummary", { success: true, data: result });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);

    // Emit the error to the socket
    socket.emit("deliveryGuyWorkSummary", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getDeliveryGuyWorkSummary;
