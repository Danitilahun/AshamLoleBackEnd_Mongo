const Deliveryguy = require("../../models/deliveryguySchema");
const DailyTable = require("../../models/table/DailyTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const createDailyTable = async (branchId, sheetId, session) => {
  try {
    // Find multiple delivery guys within the provided session
    const deliveryGuys = await Deliveryguy.find({ branchId: branchId }).session(
      session
    );

    if (!deliveryGuys || deliveryGuys.length === 0) {
      throw new Error("No delivery guys found for the given branch ID.");
    }

    // Array to store personWork entries for all delivery guys
    const personWorkEntries = [];

    // Iterate through each delivery guy found within the session
    for (const deliveryGuy of deliveryGuys) {
      // Create a DeliveryGuyWork document with default values within the provided session
      const deliveryGuyWork = new DeliveryGuyWork({});

      // Save the DeliveryGuyWork document within the provided session
      await deliveryGuyWork.save({ session });

      // Get the ID of the created DeliveryGuyWork
      const deliveryGuyWorkId = deliveryGuyWork._id;

      // Add personWork entry for the current delivery guy to the array
      personWorkEntries.push({
        person: deliveryGuy._id,
        work: deliveryGuyWorkId,
      });
    }

    // Create a single DeliveryGuy15DayWorkSummary document with all personWork entries
    const summary = new DailyTable({
      personWork: personWorkEntries,
      branchId: branchId,
      sheetID: sheetId,
    });

    // Save the single DeliveryGuy15DayWorkSummary document within the provided session
    await summary.save({ session });

    return summary; // Return the created document with all personWork entries
  } catch (error) {
    console.error("Error in creating DeliveryGuy15DayWorkSummary:", error);
    throw error;
  }
};

module.exports = createDailyTable;
