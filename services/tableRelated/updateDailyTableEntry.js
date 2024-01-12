const DailyTable = require("../../models/table/DailyTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const updateDailyTableEntry = async (
  dailyTableId,
  deliveryGuyId,
  fieldName,
  valueToUpdate,
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

    // Update the specified field in DeliveryGuyWork and the 'total' field in DailyTable
    deliveryGuyWork[fieldName] += valueToUpdate;
    deliveryGuyWork.total += fieldName !== "cardFee" ? valueToUpdate : 0;
    await deliveryGuyWork.save({ session });

    // Update the 'total' field in DailyTable
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
