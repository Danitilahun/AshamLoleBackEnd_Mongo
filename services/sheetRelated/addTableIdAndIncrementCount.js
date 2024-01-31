const Sheet = require("../../models/sheetsSchema");

// Function to add tableId to Tables and increment tableCount atomically
const addTableIdAndIncrementCount = async (sheetId, date, tableId, session) => {
  try {
    const updatedSheet = await Sheet.findByIdAndUpdate(
      sheetId,
      {
        $push: { Tables: { tableId, date } },
        $inc: { tableCount: 1 },
      },
      { new: true, session } // Pass the session parameter
    );

    if (!updatedSheet) {
      console.error("Sheet not found");
      return;
    }

    return updatedSheet;

    console.log("TableId added and tableCount incremented successfully");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = addTableIdAndIncrementCount;
