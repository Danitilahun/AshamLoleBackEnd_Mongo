const Sheet = require("../../models/sheetsSchema");

// Function to update specific fields in a sheet
const updateSheetFields = async (sheetId, updatedFields, session) => {
  try {
    await Sheet.findByIdAndUpdate(
      sheetId,
      { $set: updatedFields },
      { new: true, session } // Include the session in the update options
    );

    console.log("Sheet fields updated successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = updateSheetFields;
