const Sheet = require("../models/sheetsSchema");

const getAllSheets = async (socket, branchId) => {
  try {
    console.log("branchId", branchId);
    const sheets = await Sheet.find({ branchId });
    console.log("sheets", sheets);
    socket.emit("allSheetsData", { success: true, data: sheets });
  } catch (error) {
    socket.emit("allSheetsData", {
      success: false,
      error: error.message,
    });
  }
};

module.exports = getAllSheets;
