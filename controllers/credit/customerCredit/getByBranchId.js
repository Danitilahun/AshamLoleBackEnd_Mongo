const CustomerCredit = require("../../../models/credit/customerCreditSchema");

const getCustomerCreditsByBranchId = async (req, res) => {
  try {
    const { branchId, page = 1 } = req.query;
    console.log(branchId, page);
    const limit = 10;
    const skip = (page - 1) * limit;

    const customerCredits = await CustomerCredit.find({ branchId })
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    console.log("customerCredits", customerCredits);
    res.status(200).json(customerCredits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCustomerCreditsByBranchId;
