const Wifi = require("../../../models/service/wifiSchema");

const getAllWifiByDateAndBranch = async (req, res) => {
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

    // Fetch WiFi records matching the provided date, branch ID, and fromWhere with pagination
    let wifiRecords = await Wifi.find(query).skip(skip).limit(limit);

    // Add rollNumber field in each WiFi record by incrementing
    wifiRecords = wifiRecords.map((wifi, index) => ({
      ...wifi.toObject(),
      rollNumber: skip + index + 1,
    }));

    console.log("WiFi Records:", wifiRecords);
    res.status(200).json(wifiRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllWifiByDateAndBranch;
