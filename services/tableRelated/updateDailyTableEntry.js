const DailyTable = require("../../models/table/DailyTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const updateDailyTableEntry = async (
  dailyTableId,
  deliveryGuyId,
  incrementFields,
  session
) => {
  try {
    // Find the DailyTable entry by its unique identifier
    const dailyTableEntry = await DailyTable.findById(dailyTableId).session(
      session
    );

    if (!dailyTableEntry) {
      throw new Error("DailyTable entry not found for the given id");
    }

    // Find the PersonWorkSchema for the given deliveryGuyId
    const personWork = dailyTableEntry.personWork.find(
      (entry) => entry.person.toString() === deliveryGuyId
    );

    if (!personWork) {
      throw new Error("PersonWorkSchema not found for the given delivery guy");
    }

    // Get the DeliveryGuyWork ID from PersonWorkSchema
    const deliveryGuyWorkId = personWork.work;

    // Find the DeliveryGuyWork using the ID
    const deliveryGuyWork = await DeliveryGuyWork.findById(
      deliveryGuyWorkId
    ).session(session);

    if (!deliveryGuyWork) {
      throw new Error("DeliveryGuyWork not found for the given delivery guy");
    }

    // Use $inc to atomically increment the specified fields in DeliveryGuyWork
    const updateObj = {};
    for (const [fieldName, incrementValue] of Object.entries(incrementFields)) {
      updateObj[fieldName] = incrementValue;
    }

    // Update the specified fields atomically using $inc
    await DeliveryGuyWork.findByIdAndUpdate(
      deliveryGuyWorkId,
      { $inc: updateObj },
      { session }
    );

    // Increment the 'total' field in DailyTable
    dailyTableEntry.markModified("personWork");
    await dailyTableEntry.save({ session });

    return { message: "DailyTable entry updated successfully" };
  } catch (error) {
    throw new Error(
      `Error updating DailyTable entry with ID ${dailyTableId}: ${error}`
    );
  }
};

module.exports = updateDailyTableEntry;
