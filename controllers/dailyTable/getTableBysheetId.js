const mongoose = require("mongoose");
const DailyTable = require("../../models/table/DailyTable");
const Deliveryguy = require("../../models/deliveryguySchema");
const CompanyWorks = require("../../models/table/work/companyWorksSchema");

const getDailyTableDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Retrieve DailyTable by ID within the session
    const dailyTable = await DailyTable.findById(id).session(session);

    if (!dailyTable) {
      return res.status(404).json({
        message: "DailyTable not found for the provided ID.",
      });
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
        id: work,
      });
    }

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

module.exports = getDailyTableDetails;
