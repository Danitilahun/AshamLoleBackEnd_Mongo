const Card = require("../../../models/service/cardSchema");

// Controller function to get cards based on dayRemain
const getCardsByDayRemain = async (req, res) => {
  try {
    const { minDayRemain } = req.query; // Assuming you pass the minimum dayRemain as a query parameter

    const cards = await Card.find({ dayRemain: { $gt: minDayRemain || 0 } });

    res.status(200).json({ success: true, cards });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = getCardsByDayRemain;
