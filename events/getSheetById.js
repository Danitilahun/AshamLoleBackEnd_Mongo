const Sheet = require("../models/sheetsSchema");

const getSheetById = async (socket, sheetId) => {
  try {
    const sheet = await Sheet.findById(sheetId);

    if (!sheet) {
      socket.emit("sheetData", {
        success: false,
        error: "Sheet not found for the provided ID.",
      });
      return;
    }

    socket.emit("sheetData", { success: true, data: sheet });
  } catch (error) {
    socket.emit("sheetData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getSheetById;
