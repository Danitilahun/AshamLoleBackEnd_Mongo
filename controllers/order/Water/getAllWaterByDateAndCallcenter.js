const Water = require("../../../models/service/waterSchema");

const getAllWaterByDateAndCallcenter = async (req, res) => {
  try {
    const { date, callcenterId, page = 1, fromWhere } = req.query;
    const limit = 10;

    // Convert page to a number
    const pageNumber = parseInt(page);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limit;

    // Construct query object with date, callcenterId, and optional fromWhere
    const query = {
      date: { $eq: date },
      callcenterId: { $eq: callcenterId },
    };
    if (fromWhere) {
      query.fromWhere = { $eq: fromWhere };
    }

    // Fetch Water records matching the provided date, callcenter ID, and fromWhere with pagination
    let waterRecords = await Water.find(query).skip(skip).limit(limit);

    // Add rollNumber field in each Water record by incrementing
    waterRecords = waterRecords.map((water, index) => ({
      ...water.toObject(),
      rollNumber: skip + index + 1,
    }));

    console.log("Water Records:", waterRecords);
    res.status(200).json(waterRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllWaterByDateAndCallcenter;
