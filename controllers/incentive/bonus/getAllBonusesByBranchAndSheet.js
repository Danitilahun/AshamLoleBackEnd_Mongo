const Bonus = require("../../../models/incentive/bonusSchema");

// Controller function to fetch all bonuses with total amount by branchId and sheetId
const getAllBonusesByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const bonusData = await Bonus.find({ branchId, sheetId });

    // Calculate total amount of all bonuses
    const totalAmount = bonusData.reduce(
      (total, bonus) => total + bonus.amount,
      0
    );

    res.json({ bonusData, totalAmount });
  } catch (error) {
    console.error("Error in fetching Bonuses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllBonusesByBranchAndSheet;
