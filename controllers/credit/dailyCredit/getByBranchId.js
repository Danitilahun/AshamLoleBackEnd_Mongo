const { DailyCredit } = require("../../../models/credit/dailyCreditSchema");

const getDailyCreditsByBranchId = async (req, res) => {
  try {
    const { branchId, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const dailyCredits = await DailyCredit.find({ branchId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(dailyCredits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getDailyCreditsByBranchId;
