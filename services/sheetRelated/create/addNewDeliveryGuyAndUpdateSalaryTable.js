const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuyWork = require("../../../models/table/work/deliveryGuyWorkSchema");

const addNewDeliveryGuyAndUpdateSalaryTable = async (
  tableId,
  deliveryGuyId,
  session
) => {
  try {
    // Create a DeliveryGuySalaryInfo document for the new delivery guy within the provided session
    const newDeliveryGuyWork = new DeliveryGuyWork({});
    await newDeliveryGuyWork.save({ session });
    const newDeliveryGuyWorkId = newDeliveryGuyWork._id;

    // Update the DeliveryGuySalaryTable with the new personWork entry
    const updatedSalaryTable = await DeliveryGuySalaryTable.findByIdAndUpdate(
      tableId,
      {
        $push: {
          personWork: {
            person: deliveryGuyId,
            work: newDeliveryGuyWorkId,
          },
        },
      },
      { new: true, session }
    );

    if (!updatedSalaryTable) {
      throw new Error("Failed to update DeliveryGuySalaryTable.");
    }

    return updatedSalaryTable; // Return the updated DeliveryGuySalaryTable
  } catch (error) {
    console.error(
      "Error in adding new delivery guy and updating salary table:",
      error
    );
    throw error;
  }
};

module.exports = addNewDeliveryGuyAndUpdateSalaryTable;
