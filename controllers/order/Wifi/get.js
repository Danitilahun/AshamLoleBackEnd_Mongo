const WiFi = require("../../../models/service/wifiSchema");

const getAllWiFiByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const limit = 10;

    // Convert page to a number
    const page = req.query.page || 1;
    const pageNumber = parseInt(page);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limit;

    // Construct query object with date
    const query = {
      date: { $eq: date },
    };

    // Fetch WiFi records matching the provided date with pagination
    let wifiRecords = await WiFi.find(query).skip(skip).limit(limit);

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

module.exports = getAllWiFiByDate;
