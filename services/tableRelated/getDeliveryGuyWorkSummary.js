const mongoose = require("mongoose");
const DeliveryGuy15DayWorkSummary = require("../models/DeliveryGuy15DayWorkSummary");
const Deliveryguy = require("../models/Deliveryguy");
const CompanyWorks = require("../models/CompanyWorks");

const getDeliveryGuyWorkSummary = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { sheetId } = req.params; // Assuming the sheetId is passed in the request parameters

    // Retrieve DeliveryGuy15DayWorkSummary by sheetId within the session
    const workSummary = await DeliveryGuy15DayWorkSummary.findOne({
      sheetId,
    }).session(session);

    if (!workSummary) {
      return res.status(404).json({
        message:
          "DeliveryGuy15DayWorkSummary not found for the provided sheetId.",
      });
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
      result.push({
        fullName: deliveryGuy.fullName,
        phone: deliveryGuy.phone,
        asbezaNumber: companyWorks.asbezaNumber,
        asbezaProfit: companyWorks.asbezaProfit,
        cardCollect: companyWorks.cardCollect,
        cardDistribute: companyWorks.cardDistribute,
        cardFee: companyWorks.cardFee,
        hotelProfit: companyWorks.hotelProfit,
        total: companyWorks.total,
        waterCollect: companyWorks.waterCollect,
        waterDistribute: companyWorks.waterDistribute,
        wifiCollect: companyWorks.wifiCollect,
        wifiDistribute: companyWorks.wifiDistribute,
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `DeliveryGuy work summary retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDeliveryGuyWorkSummary;
