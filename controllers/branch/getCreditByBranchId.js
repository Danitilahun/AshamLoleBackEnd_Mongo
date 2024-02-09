const BranchTotalCredit = require("../../models/branchRelatedSchema/branchTotalCredit");

const getCreditByBranchId = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branchTotalCredit = await BranchTotalCredit.findOne({ branchId });

    if (!branchTotalCredit) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Credit not found for the given branchId",
        });
    }

    res.status(200).json(branchTotalCredit);
  } catch (error) {
    console.error("Error getting credit by branchId:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { getCreditByBranchId };
