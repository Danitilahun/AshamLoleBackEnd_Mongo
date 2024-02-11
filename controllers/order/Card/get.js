const Card = require("../../../models/service/cardSchema");

const getAllCardByDateAndBranch = async (req, res) => {
  try {
    const { date, branchId, page = 1, fromWhere } = req.query;
    const limit = 10;

    // Convert page to a number
    const pageNumber = parseInt(page);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limit;

    // Construct query object with date, branchId, and optional fromWhere
    const query = {
      date: { $eq: date },
      branchId: { $eq: branchId },
    };
    if (fromWhere) {
      query.fromWhere = { $eq: fromWhere };
    }

    // Fetch Card records matching the provided date, branch ID, and fromWhere with pagination
    let cardRecords = await Card.find(query).skip(skip).limit(limit);

    // Add rollNumber field in each card record by incrementing
    cardRecords = cardRecords.map((card, index) => ({
      ...card.toObject(),
      rollNumber: skip + index + 1,
    }));

    console.log("Card Records:", cardRecords);
    res.status(200).json(cardRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllCardByDateAndBranch;
