const CompanyGain = require("../../../models/price/companyGainSchema");

// Controller function to get the single document
const getCompanyGain = async (req, res) => {
  try {
    // Find the single document in the collection
    const companyGain = await CompanyGain.findOne();

    if (!companyGain) {
      return res
        .status(404)
        .json({ message: "CompanyGain document not found" });
    }

    // Send the document as the response
    res.status(200).json(companyGain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getCompanyGain;
