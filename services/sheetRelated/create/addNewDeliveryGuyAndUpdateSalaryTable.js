const Deliveryguy = require("../../../models/deliveryguySchema");
const DeliveryGuySalaryTable = require("../../../models/table/salary/DeliveryGuySalaryTable");
const DeliveryGuySalaryInfo = require("../../../models/table/work/deliveryGuySalaryInfoSchema");

const addNewDeliveryGuyAndUpdateSalaryTable = async (
  branchId,
  sheetId,
  newDeliveryGuyData,
  session
) => {
  try {
    // Create a new delivery guy within the provided session
    const newDeliveryGuy = new Deliveryguy(newDeliveryGuyData);
    await newDeliveryGuy.save({ session });

    // Create a DeliveryGuySalaryInfo document for the new delivery guy within the provided session
    const newDeliveryGuyWork = new DeliveryGuySalaryInfo({});
    await newDeliveryGuyWork.save({ session });

    // Get the ID of the created DeliveryGuySalaryInfo document
    const newDeliveryGuyWorkId = newDeliveryGuyWork._id;

    // Update the DeliveryGuySalaryTable with the new personWork entry
    const updatedSalaryTable = await DeliveryGuySalaryTable.findOneAndUpdate(
      { branchId, sheetID: sheetId },
      {
        $push: {
          personWork: {
            person: newDeliveryGuy._id,
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
