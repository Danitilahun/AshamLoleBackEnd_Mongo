const Bank = require("../../models/bankSchema");

const getBankFromBanksByName = async (req, res) => {
  try {
    const { bankName } = req.params; // Assuming bankName is provided in the request parameters

    const banks = await Bank.find({ bankName });

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
