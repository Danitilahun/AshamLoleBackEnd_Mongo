const Essential = require("../../models/essentialSchema");

async function createEssential(session, data) {
  try {
    // Create the Essential document within the provided session
    const essential = await Essential.create([data], { session });

    return essential[0]; // Assuming create returns an array, return the first element
  } catch (error) {
    // Handle the error, you might want to log or rethrow it
    throw error;
  }
}

module.exports = createEssential;
