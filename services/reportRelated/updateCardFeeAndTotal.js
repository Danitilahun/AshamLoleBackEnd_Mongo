const DeliveryGuyWork = require("../../models/deliveryGuyWorkSchema");
const SalaryTable = require("../../models/salaryTableSchema");

const updateCardFeeAndTotal = async (deliveryGuyId, salaryTableId, value) => {
  try {
    // Find SalaryTable document with the given _id
    const salaryTable = await SalaryTable.findById(salaryTableId);

    if (
      !salaryTable ||
      salaryTable.personWork.some((item) => item.person !== deliveryGuyId)
    ) {
      throw new Error(
        "SalaryTable not found for the given SalaryTable ID or Delivery Guy ID."
      );
    }

    // Extract Delivery Guy Work ID from the SalaryTable
    const deliveryGuyWorkId = salaryTable.personWork.find(
      (item) => item.person === deliveryGuyId
    )?.work;

    if (!deliveryGuyWorkId) {
      throw new Error(
        "Delivery Guy Work ID not found for the given Delivery Guy ID."
      );
    }

    // Update cardFee and total using atomic operation in DeliveryGuyWork
    const updatedDeliveryGuyWork = await DeliveryGuyWork.findByIdAndUpdate(
      deliveryGuyWorkId,
      {
        $inc: { cardFee: value, total: value },
      },
      { new: true } // To return the updated document
    );

    if (!updatedDeliveryGuyWork) {
      throw new Error(
        "DeliveryGuyWork not found for the given Delivery Guy Work ID."
      );
    }

    return updatedDeliveryGuyWork;
  } catch (error) {
    console.error(
      `Error updating cardFee and total for Delivery Guy ${deliveryGuyId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateCardFeeAndTotal;
