const WifiDistribute = require("../../../models/report/wifiDistributeSchema");

// Controller function to fetch paginated WifiDistribute by branchId and sheetId
const getWifiDistributeByBranchAndSheet = async (req, res) => {
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

    // Fetch paginated WifiDistribute records matching the provided branchId and sheetId
    const wifiDistributeData = await WifiDistribute.find({ branchId, sheetId })
      .skip(skip)
      .limit(limitNumber);

    return res.json(wifiDistributeData);
  } catch (error) {
    console.error("Error in fetching WifiDistribute:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getWifiDistributeByBranchAndSheet;
