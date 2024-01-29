const CardFee = require("../../../models/report/cardFeeSchema");

// Controller function to get paginated CardFee by branchId and sheetId
const getCardFeesByBranchAndSheet = async (req, res) => {
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

    // Fetch paginated CardFee documents matching the provided branchId and sheetId
    const cardFees = await CardFee.find({ branchId, sheetId })
      .skip(skip)
      .limit(limitNumber)
      .sort({ updatedAt: -1 });

    return res.status(200).json({ cardFees });
  } catch (error) {
    console.error("Error in getCardFeesByBranchAndSheet:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getCardFeesByBranchAndSheet;
