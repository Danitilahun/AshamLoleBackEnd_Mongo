const mongoose = require("mongoose");
const DeliveryGuy15DayWorkSummary = require("../../../models/table/DeliveryGuy15DayWorkSummarySchema");
const Deliveryguy = require("../../../models/deliveryguySchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

const getDeliveryGuyWorkSummary = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { tableId } = req.params;

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
    let sumFields = {
      asbezaProfit: 0,
      asbezaNumber: 0,
      cardCollect: 0,
      cardDistribute: 0,
      cardFee: 0,
      hotelProfit: 0,
      waterCollect: 0,
      waterDistribute: 0,
      wifiCollect: 0,
      wifiDistribute: 0,
      total: 0,
    };

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

      // Update sumFields for numeric fields
      for (const [key, value] of Object.entries(workDetails)) {
        if (typeof value === "number" && sumFields.hasOwnProperty(key)) {
          sumFields[key] += value;
        }
      }

      result.push(workDetails);
    }

    sumFields.name = "Total";
    sumFields.uniqueName = "T";
    result.push(sumFields);
    // console.log("sumFields", sumFields);
    // result.push();

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
