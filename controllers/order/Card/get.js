const Card = require("../../../models/service/cardSchema");

const getAllCardByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Fetch all Card records matching the provided date
    const cardRecords = await Card.find({ date: { $eq: date } });

    res.status(200).json({
      message: "Card records retrieved successfully",
      cardRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllCardByDate;
