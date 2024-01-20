const Deliveryguy = require("../../models/deliveryguySchema");
const DailyTable = require("../../models/table/DailyTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const addDeliveryGuyToDailyTable = async (
  branchId,
  sheetId,
  deliveryGuyId,
  session
) => {
  try {
    // Find the specific delivery guy within the provided session
    const deliveryGuy = await Deliveryguy.findById(deliveryGuyId).session(
      session
    );

    if (!deliveryGuy) {
      throw new Error("Delivery guy not found for the given ID.");
    }

    // Create a new DeliveryGuyWork document with default values within the provided session
    const newDeliveryGuyWork = new DeliveryGuyWork({});

    // Save the new DeliveryGuyWork document within the provided session
    await newDeliveryGuyWork.save({ session });

    // Get the ID of the created DeliveryGuyWork
    const newDeliveryGuyWorkId = newDeliveryGuyWork._id;

    // Add a new personWork entry for the current delivery guy to the DailyTable
    const updatedSummary = await DailyTable.findOneAndUpdate(
      { branchId: branchId, sheetID: sheetId },
      {
        $push: {
          personWork: {
            person: deliveryGuy._id,
            work: newDeliveryGuyWorkId,
          },
        },
      },
      { new: true, session }
    );

    return updatedSummary; // Return the updated document with the new personWork entry
  } catch (error) {
    console.error("Error in updating DailyTable:", error);
    throw error;
  }
};

module.exports = addDeliveryGuyToDailyTable;
