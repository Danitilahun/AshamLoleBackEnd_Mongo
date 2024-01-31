const Sheet = require("../../models/sheetsSchema");

const addTableToSheet = async (sheetId, tableId, session) => {
  try {
    try {
      // Retrieve the sheet with the provided sheetId within the session
      const sheet = await Sheet.findById(sheetId).session(session);

      if (!sheet) {
        throw new Error("Sheet not found for the provided sheetId.");
      }

      // Add the tableId to the Tables array
      sheet.Tables.push(tableId);

      // Save the updated sheet within the session
      const updatedSheet = await sheet.save({ session });
      return updatedSheet;
    } catch (error) {
      throw error;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = addTableToSheet;
