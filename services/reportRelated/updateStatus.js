const Status = require("../../models/statusSchema");

const updateStatus = async (statusId, increments, session) => {
  try {
    // Update the Status document for the given branchId using $inc
    const updatedStatus = await Status.findOneAndUpdate(
      statusId,
      { $inc: increments }, // Use $inc to increment specified fields
      { new: true, session } // To return the updated document and use the provided session
    );

    if (!updatedStatus) {
      throw new Error("Status document not found for the given branchId.");
    }

    return updatedStatus;
  } catch (error) {
    console.error(`Error updating Status for branch ${branchId}:`, error);
    throw error;
  }
};

module.exports = updateStatus;
