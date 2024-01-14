const WaterDistribute = require("../../../models/report/waterDistributeSchema");

// Controller function to fetch WaterDistribute by branchId and sheetId
const getWaterDistributeByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const waterDistributeData = await WaterDistribute.find({
      branchId,
      sheetId,
    });
    res.json(waterDistributeData);
  } catch (error) {
    console.error("Error in fetching WaterDistribute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getWaterDistributeByBranchAndSheet;
