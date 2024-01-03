const BranchBankTotal = require("../../models/branchRelatedSchema/branchBankTotal");

const getBranchBankTotalByBranchId = async (req, res) => {
  try {
    const { branchId } = req.params; // Assuming branchId is provided in the request parameters

    const branchBankTotal = await BranchBankTotal.findOne({ branchId });

    if (!branchBankTotal) {
      return res
        .status(404)
        .json({ success: false, message: "Branch bank details not found." });
    }

    res.status(200).json({
      success: true,
      message: "Branch bank details retrieved successfully",
      data: branchBankTotal,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "Error getting BranchBankTotal by branchId",
      });
  }
};

module.exports = getBranchBankTotalByBranchId;
