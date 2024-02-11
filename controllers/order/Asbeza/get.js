const Asbeza = require("../../../models/service/asbezaSchema");

const getAllAsbezaByDateAndBranch = async (req, res) => {
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

    // Fetch Asbeza records matching the provided date, branch ID, and fromWhere with pagination
    let asbezaRecords = await Asbeza.find(query).skip(skip).limit(limit);

    // Add rollNumber field in each asbeza record by incrementing
    asbezaRecords = asbezaRecords.map((asbeza, index) => ({
      ...asbeza.toObject(),
      rollNumber: skip + index + 1,
    }));

    console.log("Asbeza Records:", asbezaRecords);
    res.status(200).json(asbezaRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllAsbezaByDateAndBranch;
