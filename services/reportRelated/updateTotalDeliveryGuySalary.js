const Status = require("../../models/statusSchema");

const updateTotalDeliveryGuySalary = async (branchId, value, session) => {
  try {
    // Update the totalDeliveryGuySalary for the given branchId using $inc
    const updatedStatus = await Status.findOneAndUpdate(
      { branchId },
      { $inc: { totalDeliveryGuySalary: value } },
      { new: true, session } // To return the updated document and use the provided session
    );

    if (!updatedStatus) {
      throw new Error("Status document not found for the given branchId.");
    }

    return updatedStatus;
  } catch (error) {
    console.error(
      `Error updating totalDeliveryGuySalary for branch ${branchId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateTotalDeliveryGuySalary;
