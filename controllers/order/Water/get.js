const Water = require("../../../models/service/waterSchema");

const getAllWaterByDate = async (req, res) => {
  try {
    const { date, page = 1 } = req.query;
    const limit = 10;

    // Convert page to a number
    const pageNumber = parseInt(page);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limit;

    // Construct query object with date
    const query = {
      date: { $eq: date },
    };

    // Fetch Water records matching the provided date with pagination
    let waterRecords = await Water.find(query).skip(skip).limit(limit);

    // Add rollNumber field in each water record by incrementing
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

module.exports = getAllWaterByDate;
