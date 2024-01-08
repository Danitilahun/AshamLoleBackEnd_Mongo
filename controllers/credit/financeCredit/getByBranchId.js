const FinanceCreditSchema = require("../../../models/FinanceCreditSchema");

const getFinanceCreditsByBranchId = async (req, res) => {
  try {
    const { branchId, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const financeCredits = await FinanceCreditSchema.find({ branchId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ financeCredits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getFinanceCreditsByBranchId;
