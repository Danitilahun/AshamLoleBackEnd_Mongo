const DeliveryGuySalaryTable = require("../../models/table/salary/DeliveryGuySalaryTable");

const checkTotal = async (summaryId, deliveryGuyId, session) => {
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

    // Update the specified field in DeliveryGuySalaryInfo and the 'total' field in DeliveryGuySalaryTable
    deliveryGuyWork[fieldName] += valueToUpdate;
    deliveryGuyWork.total += valueTotal;
    await deliveryGuyWork.save({ session });

    // Update the 'total' field in DeliveryGuySalaryTable
    summary.markModified("personWork");
    await summary.save({ session });

    // Return the total value from DeliveryGuySalaryInfo
    return {
      total: deliveryGuyWork.total,
      message: "DeliveryGuySalaryTable entry updated successfully",
    };
  } catch (error) {
    throw new Error(
      `Error updating DeliveryGuySalaryTable entry with ID ${summaryId}: ${error}`
    );
  }
};

module.exports = checkTotal;
