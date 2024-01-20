const AshamStaff = require("../../models/ashamStaffSchema");

// Update AshamStaff based on workerId
const updateAshamStaffByWorkerId = async (workerId, data, session) => {
  try {
    // Use the provided session to ensure data consistency
    const updatedAshamStaff = await AshamStaff.findOneAndUpdate(
      { workerId: workerId },
      { $set: data },
      { new: true, session }
    );

    if (!updatedAshamStaff) {
      throw new Error(`AshamStaff with workerId '${workerId}' not found`);
    }

    return updatedAshamStaff;
  } catch (error) {
    throw error;
  }
};

module.exports = updateAshamStaffByWorkerId;
