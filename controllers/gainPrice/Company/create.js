const CompanyGain = require("../../../models/price/companyGainSchema");

const createCompanyGain = async (req, res) => {
  try {
    const existingGain = await CompanyGain.findOne();

    if (existingGain) {
      return res.status(400).json({ message: "CompanyGain already exists." });
    }

    const defaultGain = new CompanyGain();
    await defaultGain.save();

    res
      .status(201)
      .json({ message: "CompanyGain created successfully", defaultGain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCompanyGain };
