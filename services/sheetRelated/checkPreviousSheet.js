const Sheet = require("../../models/sheetsSchema");

const checkPreviousSheet = async (id) => {
  try {
    if (!id) return null;
    const prevSheet = await Sheet.findById(id); // Find sheet by ID
    if (prevSheet && prevSheet.tableCount < 15) {
      return {
        message: `You can't create a new sheet since you have not finished the previous one. The previous sheet can hold ${
          15 - prevSheet.tableCount
        } more tables.`,
        type: "info",
        numberOfTablesLeft: 15 - prevSheet.tableCount,
        sheetStatus: prevSheet.sheetStatus,
      };
    }
    return null;
  } catch (error) {
    console.error("Error in checkPreviousSheet:", error);
    throw error; // Re-throw the error to be handled at the caller's level
  }
};

module.exports = checkPreviousSheet;
