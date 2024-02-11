const Bank = require("../../models/bankSchema");

const getBankFromBanksByName = async (req, res) => {
  try {
    const { bankName, branchId } = req.query;
    console.log("Bank Name:", bankName);
    console.log("Branch ID:", branchId);

    let query = {};

    if (bankName) {
      query.bankName = bankName;
    }

    if (branchId) {
      query.branchId = branchId;
    }

    const banks = await Bank.find(query);
    console.log("Banks:", banks);
    res.status(200).json(banks);
  } catch (error) {
    cconsole.error("Error:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Error getting bank from banks by name" });
  }
};

module.exports = getBankFromBanksByName;
