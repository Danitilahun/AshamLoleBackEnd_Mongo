const WifiDistribute = require("../../../models/report/wifiDistributeSchema");

// Controller function to fetch WifiDistribute by branchId and sheetId
const getWifiDistributeByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const wifiDistributeData = await WifiDistribute.find({ branchId, sheetId });
    res.json(wifiDistributeData);
  } catch (error) {
    console.error("Error in fetching WifiDistribute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getWifiDistributeByBranchAndSheet;
