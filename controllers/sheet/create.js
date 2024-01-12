const Sheet = require("../../models/sheetsSchema");
const checkPreviousSheet = require("../../services/sheetRelated/checkPreviousSheet");
const checkPreviousSheetStatus = require("../../services/sheetRelated/checkPreviousSheetStatus");

// Create a new sheet
const createSheet = async (req, res) => {
  try {
    const data = req.body;

    const prevSheetCheckResult = await checkPreviousSheet(data.sheetId);
    if (prevSheetCheckResult) {
      return res.status(400).json(prevSheetCheckResult);
    }

    const prevSheetCheck = await checkPreviousSheetStatus(data.branchId);
    if (prevSheetCheck) {
      return res.status(400).json(prevSheetCheck);
    }
    const newSheet = new Sheet(data);
    const savedSheet = await newSheet.save();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createSheet;
