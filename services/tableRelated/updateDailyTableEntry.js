const mongoose = require("mongoose");
const DailyTable = require("../../models/DailyTable");
const DeliveryGuyWork = require("../../models/deliveryGuyWorkSchema");

const updateDailyTableEntry = async (
  branchId,
  sheetId,
  deliveryGuyId,
  fieldName,
  valueToUpdate
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the DailyTable entry with branchId and sheetId
    const dailyTableEntry = await DailyTable.findOne({
      branchId,
      sheetId,
    }).session(session);

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
    deliveryGuyWork.total += valueToUpdate;
    await deliveryGuyWork.save({ session });

    // Update the 'total' field in DailyTable
    dailyTableEntry.markModified("personWork");
    await dailyTableEntry.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { message: "DailyTable entry updated successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { error: error.message };
  }
};

module.exports = updateDailyTableEntry;
