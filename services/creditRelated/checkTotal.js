const DeliveryGuySalaryTable = require("../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuyWork = require("../../models/table/work/deliveryGuyWorkSchema");

const checkTotal = async (salaryId, deliveryGuyId, session) => {
  try {
    // Find the DeliveryGuySalaryTable entry by its unique identifier
    const summary = await DeliveryGuySalaryTable.findById(salaryId).session(
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

    // Return the total value from DeliveryGuySalaryInfo
    return deliveryGuyWork.total;
  } catch (error) {
    throw new Error(
      `Error updating DeliveryGuySalaryTable entry with ID ${salaryId}: ${error}`
    );
  }
};

module.exports = checkTotal;
