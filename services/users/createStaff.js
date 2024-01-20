const Staff = require("../../models/staffSchema");

async function createStaff(session, data) {
  try {
    // Create the Staff document within the provided session
    const staff = await Staff.create([data], { session });

    return staff[0];
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createStaff;
