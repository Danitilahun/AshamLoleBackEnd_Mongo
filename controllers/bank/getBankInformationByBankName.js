const Bank = require("../../models/bankSchema");

const getBankFromBanksByName = async (req, res) => {
  try {
    const { bankName, branchId } = req.query;

    let query = {};

    if (bankName) {
      query.bankName = bankName;
    }

    if (branchId) {
      query.branchId = branchId;
    }

    const banks = await Bank.find(query);

    res.status(200).json({
      success: true,
      message: "Banks retrieved successfully",
      data: banks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error getting bank from banks by name" });
  }
};

module.exports = getBankFromBanksByName;
