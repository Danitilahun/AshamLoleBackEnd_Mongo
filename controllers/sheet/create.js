const Sheet = require("../../models/sheetsSchema");

// Create a new sheet
const createSheet = async (req, res) => {
  try {
    const {
      Tables,
      active,
      activeDailySummary,
      branchId,
      date,
      name,
      prevActive,
      previousActive,
      realDate,
      sheetNumber,
      sheetStatus,
      tableDate,
      tableCount,
    } = req.body;

    const newSheet = new Sheet({
      Tables,
      active,
      activeDailySummary,
      branchId,
      date,
      name,
      prevActive,
      previousActive,
      realDate,
      sheetNumber,
      sheetStatus,
      tableDate,
      tableCount,
    });

    const savedSheet = await newSheet.save();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createSheet;
