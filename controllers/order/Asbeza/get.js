const Asbeza = require("../../../models/service/asbezaSchema");

const getAllAsbezaByDate = async (req, res) => {
  try {
    const { date, page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch Asbeza records matching the provided date with pagination
    const asbezaRecords = await Asbeza.find({ date: { $eq: date } })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      message: "Asbeza records retrieved successfully",
      asbezaRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllAsbezaByDate;
