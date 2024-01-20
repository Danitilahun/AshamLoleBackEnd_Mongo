const AshamStaff = require("../../models/ashamStaffSchema");

async function createAshamStaff(session, data) {
  try {
    // Create the AshamStaff document within the provided session
    const ashamStaff = await AshamStaff.create([data], { session });

    return ashamStaff[0]; // Assuming create returns an array, return the first element
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createAshamStaff;
