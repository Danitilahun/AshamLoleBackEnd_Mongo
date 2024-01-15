const mongoose = require("mongoose");
const DailyTable = require("../models/DailyTable");
const Deliveryguy = require("../models/Deliveryguy");
const CompanyWorks = require("../models/CompanyWorks");

const getDailyTableDetails = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params; // Assuming the ID is passed in the request parameters

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
        fullName: deliveryGuy.fullName,
        phone: deliveryGuy.phone,
        totalCredit: deliveryGuy.staffCredit,
        // Add other relevant fields from Deliveryguy model
        companyWorks: {
          asbezaNumber: companyWorks.asbezaNumber,
          cardCollect: companyWorks.cardCollect,
          cardDistribute: companyWorks.cardDistribute,
          // Add other relevant fields from CompanyWorks model
        },
        // Add other fields from the dailyTable if needed
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `DailyTable details retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDailyTableDetails;
