const Sheet = require("../../../models/sheetsSchema");

// Controller function to get all sheets by branchId
const getAllSheetsByBranchId = async (req, res) => {
  const { branchId } = req.params;

  try {
    const sheets = await Sheet.find({ branchId });

    res.status(200).json({ success: true, sheets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = getAllSheetsByBranchId;
