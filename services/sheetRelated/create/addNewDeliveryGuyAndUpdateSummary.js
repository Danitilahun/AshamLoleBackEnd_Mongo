const Deliveryguy = require("../../../models/deliveryguySchema");
const DeliveryGuy15DayWorkSummary = require("../../../models/table/DeliveryGuy15DayWorkSummarySchema");
const CompanyWorks = require("../../../models/table/work/companyWorksSchema");

const addNewDeliveryGuyAndUpdateSummary = async (
  branchId,
  sheetId,
  newDeliveryGuyData,
  session
) => {
  try {
    // Create a new delivery guy within the provided session
    const newDeliveryGuy = new Deliveryguy(newDeliveryGuyData);
    await newDeliveryGuy.save({ session });

    // Create a CompanyWorks document for the new delivery guy within the provided session
    const newDeliveryGuyWork = new CompanyWorks({});
    await newDeliveryGuyWork.save({ session });

    // Get the ID of the created CompanyWorks document
    const newDeliveryGuyWorkId = newDeliveryGuyWork._id;

    // Update the DeliveryGuy15DayWorkSummary with the new personWork entry
    const updatedSummary = await DeliveryGuy15DayWorkSummary.findOneAndUpdate(
      { branchId, sheetID: sheetId },
      {
        $push: {
          personWork: {
            person: newDeliveryGuy._id,
            work: newDeliveryGuyWorkId,
          },
        },
      },
      { new: true, session }
    );

    if (!updatedSummary) {
      throw new Error("Failed to update DeliveryGuy15DayWorkSummary.");
    }

    return updatedSummary; // Return the updated DeliveryGuy15DayWorkSummary
  } catch (error) {
    console.error(
      "Error in adding new delivery guy and updating summary:",
      error
    );
    throw error;
  }
};

module.exports = addNewDeliveryGuyAndUpdateSummary;
