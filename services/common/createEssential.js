const Essential = require("../../models/essentialSchema");

const createEssential = async (essentialData, session) => {
  try {
    const newEssential = new Essential(essentialData);
    await newEssential.save({ session });
    return newEssential;
  } catch (error) {
    console.error("Error in creating Essential:", error);
    throw error;
  }
};

module.exports = createEssential;
