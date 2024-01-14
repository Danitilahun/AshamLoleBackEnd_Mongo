const Sheet = require("../../models/sheetsSchema");

// Function to add tableId to Tables and increment tableCount atomically
const addTableIdAndIncrementCount = async (sheetId, tableId) => {
  try {
    const updatedSheet = await Sheet.findByIdAndUpdate(
      sheetId,
      {
        $push: { Tables: tableId },
        $inc: { tableCount: 1 },
      },
      { new: true } // Return the modified document
    );

    if (!updatedSheet) {
      console.error("Sheet not found");
      return;
    }

    console.log("TableId added and tableCount incremented successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = addTableIdAndIncrementCount;
