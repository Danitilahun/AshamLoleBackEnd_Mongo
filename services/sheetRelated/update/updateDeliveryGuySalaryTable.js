const mongoose = require("mongoose");
const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuySalaryInfo = require("../../../models/table/work/deliveryGuySalaryInfoSchema");

const updateDeliveryGuySalaryTable = async (
  summaryId,
  deliveryGuyId,
  fieldName,
  valueToUpdate,
  session
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the DeliveryGuySalaryTable entry by its unique identifier
    const summary = await DeliveryGuySalaryTable.findById(summaryId).session(
      session
    );

    if (!summary) {
      throw new Error("DeliveryGuySalaryTable not found for the given id");
    }

    // Find the PersonWorkSchema for the given deliveryGuyId
    const personWork = summary.personWork.find(
      (entry) => entry.person.toString() === deliveryGuyId
    );

    if (!personWork) {
      throw new Error("PersonWorkSchema not found for the given delivery guy");
    }

    // Get the DeliveryGuySalaryInfo ID from PersonWorkSchema
    const deliveryGuyWorkId = personWork.work;

    // Find the DeliveryGuySalaryInfo using the ID
    const deliveryGuyWork = await DeliveryGuySalaryInfo.findById(
      deliveryGuyWorkId
    ).session(session);

    if (!deliveryGuyWork) {
      throw new Error(
        "DeliveryGuySalaryInfo not found for the given delivery guy"
      );
    }

    // Update the specified field in DeliveryGuySalaryInfo and the 'total' field in DeliveryGuySalaryTable
    deliveryGuyWork[fieldName] += valueToUpdate;
    deliveryGuyWork.total += valueToUpdate;
    await deliveryGuyWork.save({ session });

    // Update the 'total' field in DeliveryGuySalaryTable
    summary.markModified("personWork");
    await summary.save({ session });

    await session.commitTransaction();
    session.endSession();

    return { message: "DeliveryGuySalaryTable entry updated successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { error: error.message };
  }
};

module.exports = updateDeliveryGuySalaryTable;
