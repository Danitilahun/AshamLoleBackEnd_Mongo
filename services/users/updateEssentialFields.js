const Essential = require("../../models/essentialSchema");

// Update arbitrary fields in the Essential model
const updateEssentialFields = async (id, updatedFields, session) => {
  try {
    // Use the provided session to ensure data consistency
    const updatedEssential = await Essential.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, session }
    );

    if (!updatedEssential) {
      throw new Error(`Essential with id '${id}' not found`);
    }

    return updatedEssential;
  } catch (error) {
    throw error;
  }
};

module.exports = updateEssentialFields;
