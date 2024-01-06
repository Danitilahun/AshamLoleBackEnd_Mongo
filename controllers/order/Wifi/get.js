const Wifi = require("../../../models/service/wifiSchema");

const getAllWifiByDate = async (req, res) => {
  try {
    const { date } = req.body;

    // Fetch all Wifi records matching the provided date
    const wifiRecords = await Wifi.find({ date: { $eq: date } });

    res.status(200).json({
      message: "Wifi records retrieved successfully",
      wifiRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllWifiByDate;
