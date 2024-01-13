const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuyWork = require("../../../models/table/work/deliveryGuyWorkSchema");

const updateDeliveryGuySalaryTable = async (
  summaryId,
  deliveryGuyId,
  incrementFields,
  session
) => {
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
    const deliveryGuyWork = await DeliveryGuyWork.findById(
      deliveryGuyWorkId
    ).session(session);

    if (!deliveryGuyWork) {
      throw new Error(
        "DeliveryGuySalaryInfo not found for the given delivery guy"
      );
    }

    // Use $inc to atomically increment the specified fields in DeliveryGuySalaryInfo
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

    // Increment the 'total' field in DeliveryGuySalaryTable
    summary.markModified("personWork");
    await summary.save({ session });

    return { message: "DeliveryGuySalaryTable entry updated successfully" };
  } catch (error) {
    throw new Error(
      `Error updating DeliveryGuySalaryTable entry with ID ${summaryId}: ${error}`
    );
  }
};

module.exports = updateDeliveryGuySalaryTable;
