const Water = require("../../../models/service/waterSchema");

const getAllWaterByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Fetch all Water records matching the provided date
    const waterRecords = await Water.find({ date: { $eq: date } });

    res.status(200).json({
      message: "Water records retrieved successfully",
      waterRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllWaterByDate;
