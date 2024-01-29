const CardDistribute = require("../../../models/report/cardDistributeSchema");

// Controller function to fetch CardDistribute by branchId and sheetId with pagination
const getCardDistributeByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    const cardDistributeData = await CardDistribute.find({ branchId, sheetId })
      .skip(skip)
      .limit(limitNumber)
      .sort({ updatedAt: -1 });

    res.json(cardDistributeData);
  } catch (error) {
    console.error("Error in fetching CardDistribute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getCardDistributeByBranchAndSheet;
