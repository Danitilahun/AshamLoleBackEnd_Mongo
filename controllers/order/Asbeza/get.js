const Asbeza = require("../../../models/service/asbezaSchema");

const getAllAsbezaByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Fetch all Asbeza records matching the provided date
    const asbezaRecords = await Asbeza.find({ date: { $eq: date } });

    res.status(200).json({
      message: "Asbeza records retrieved successfully",
      asbezaRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllAsbezaByDate;
