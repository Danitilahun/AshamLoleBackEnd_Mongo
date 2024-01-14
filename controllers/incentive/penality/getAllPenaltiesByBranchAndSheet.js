const Penalty = require("../../../models/incentive/penaltySchema");

// Controller function to fetch all penalties with total amount by branchId and sheetId
const getAllPenaltiesByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const penaltyData = await Penalty.find({ branchId, sheetId });

    // Calculate total amount of all penalties
    const totalAmount = penaltyData.reduce(
      (total, penalty) => total + penalty.amount,
      0
    );

    res.json({ penaltyData, totalAmount });
  } catch (error) {
    console.error("Error in fetching Penalties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllPenaltiesByBranchAndSheet;
