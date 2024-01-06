const CompanyGain = require("../../../models/price/companyGainSchema");

const updateCompanyGainField = async (req, res) => {
  try {
    const { fieldName, fieldValue } = req.body;

    if (!fieldName || !fieldValue) {
      return res
        .status(400)
        .json({ message: "Please provide both field name and value." });
    }

    const existingGain = await CompanyGain.findOne();

    if (!existingGain) {
      return res.status(404).json({ message: "CompanyGain not found." });
    }

    if (existingGain[fieldName] === undefined) {
      return res
        .status(400)
        .json({ message: "Field does not exist in CompanyGain." });
    }

    existingGain[fieldName] = fieldValue;
    await existingGain.save();

    res.status(200).json({
      message: `Field '${fieldName}' updated successfully`,
      existingGain,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateCompanyGainField;
