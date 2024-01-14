const CardFee = require("../../../models/report/cardFeeSchema");

// Controller function to get all CardFee with branchId and sheetId
const getCardFeesByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;

    if (!branchId || !sheetId) {
      return res
        .status(400)
        .json({ error: "Both branchId and sheetId are required." });
    }

    // Fetch all CardFee documents matching the provided branchId and sheetId
    const cardFees = await CardFee.find({ branchId, sheetId });

    return res.status(200).json({ cardFees });
  } catch (error) {
    console.error("Error in getCardFeesByBranchAndSheet:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCardFeesByBranchAndSheet };
