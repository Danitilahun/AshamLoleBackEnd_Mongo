const WaterDistribute = require("../../../models/report/waterDistributeSchema");

// Controller function to fetch paginated WaterDistribute by branchId and sheetId
const getWaterDistributeByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId, page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    if (!branchId || !sheetId) {
      return res
        .status(400)
        .json({ error: "Both branchId and sheetId are required." });
    }

    // Fetch paginated WaterDistribute records matching the provided branchId and sheetId
    const waterDistributeData = await WaterDistribute.find({
      branchId,
      sheetId,
    })
      .skip(skip)
      .limit(limitNumber)
      .sort({ updatedAt: -1 });

    return res.json(waterDistributeData);
  } catch (error) {
    console.error("Error in fetching WaterDistribute:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getWaterDistributeByBranchAndSheet;
