const CardDistribute = require("../../../models/report/cardDistributeSchema");

// Controller function to fetch CardDistribute by branchId and sheetId
const getCardDistributeByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const cardDistributeData = await CardDistribute.find({ branchId, sheetId });
    res.json(cardDistributeData);
  } catch (error) {
    console.error("Error in fetching CardDistribute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getCardDistributeByBranchAndSheet;
