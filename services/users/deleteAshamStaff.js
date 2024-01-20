const AshamStaff = require("../../models/ashamStaffSchema");

// Delete an AshamStaff based on a specific field value
const deleteAshamStaffByField = async (field, value, session) => {
  try {
    // Use the provided session to ensure data consistency
    const query = { [field]: value };
    const deletedAshamStaff = await AshamStaff.findOneAndDelete(query).session(
      session
    );

    if (!deletedAshamStaff) {
      throw new Error(`AshamStaff with ${field} '${value}' not found`);
    }

    return deletedAshamStaff;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteAshamStaffByField;
