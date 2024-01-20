const AshamStaff = require("../../models/ashamStaffSchema");

// Delete an AshamStaff based on ID
const deleteAshamStaff = async (id, session) => {
  try {
    // Use the provided session to ensure data consistency
    const deletedAshamStaff = await AshamStaff.findByIdAndDelete(id).session(
      session
    );

    if (!deletedAshamStaff) {
      throw new Error("AshamStaff not found");
    }

    return deletedAshamStaff;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteAshamStaff;
