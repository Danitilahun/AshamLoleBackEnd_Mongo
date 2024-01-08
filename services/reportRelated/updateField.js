const DeliveryGuyWork = require("../../models/deliveryGuyWorkSchema");
const SalaryTable = require("../../models/salaryTableSchema");

const updateField = async (
  deliveryGuyId,
  salaryTableId,
  fieldName,
  value,
  session
) => {
  try {
    const salaryTable = await SalaryTable.findById(salaryTableId).session(
      session
    );

    if (
      !salaryTable ||
      salaryTable.personWork.some((item) => item.person !== deliveryGuyId)
    ) {
      throw new Error(
        "SalaryTable not found for the given SalaryTable ID or Delivery Guy ID."
      );
    }

    const deliveryGuyWorkId = salaryTable.personWork.find(
      (item) => item.person === deliveryGuyId
    )?.work;

    if (!deliveryGuyWorkId) {
      throw new Error(
        "Delivery Guy Work ID not found for the given Delivery Guy ID."
      );
    }

    // Create the update object with the dynamic field name
    let updateFieldObj = {};
    updateFieldObj[fieldName] = value;

    // Update the dynamic field and the 'total' field using atomic operation in DeliveryGuyWork within the provided session
    const updatedDeliveryGuyWork = await DeliveryGuyWork.findByIdAndUpdate(
      deliveryGuyWorkId,
      { $inc: { [fieldName]: value, total: value } },
      { new: true, session }
    );

    if (!updatedDeliveryGuyWork) {
      throw new Error(
        `DeliveryGuyWork not found for the given Delivery Guy Work ID with field ${fieldName}.`
      );
    }

    return updatedDeliveryGuyWork;
  } catch (error) {
    console.error(
      `Error updating ${fieldName} for Delivery Guy ${deliveryGuyId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateField;
