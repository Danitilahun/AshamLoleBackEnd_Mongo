const CustomerCreditSchema = require("../../../models/credit/customerCreditSchema");

const getCustomerCreditsByBranchId = async (req, res) => {
  try {
    const { branchId, page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    const customerCredits = await CustomerCreditSchema.find({ branchId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sorting based on createdAt timestamp, adjust as needed

    res.status(200).json({ customerCredits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCustomerCreditsByBranchId;
