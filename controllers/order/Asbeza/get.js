const Asbeza = require("../../../models/service/asbezaSchema");

const getAllAsbezaByDateAndBranch = async (req, res) => {
  try {
    const { date, branchId, page = 1 } = req.query;
    const limit = 10; // Default limit value

    // Convert page to a number
    const pageNumber = parseInt(page);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limit;

    // Fetch Asbeza records matching the provided date and branch ID with pagination
    const asbezaRecords = await Asbeza.find({
      date: { $eq: date },
      branchId: { $eq: branchId },
    })
      .skip(skip)
      .limit(limit); // Use default limit

    res.status(200).json({
      message: "Asbeza records retrieved successfully",
      asbezaRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllAsbezaByDateAndBranch;
