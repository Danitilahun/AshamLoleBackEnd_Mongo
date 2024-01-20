const Staff = require("../../models/staffSchema");

async function createStaff(session, data) {
  try {
    // Create the Staff document within the provided session
    const staff = await Staff.create([data], { session });

    return staff[0]; // Assuming create returns an array, return the first element
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createStaff;
