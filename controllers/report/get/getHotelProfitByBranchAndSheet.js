const HotelProfit = require("../../../models/report/hotelProfitSchema");

// Controller function to fetch HotelProfit by branchId and sheetId
const getHotelProfitByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, sheetId } = req.body;
    const hotelProfitData = await HotelProfit.find({ branchId, sheetId });
    res.json(hotelProfitData);
  } catch (error) {
    console.error("Error in fetching HotelProfit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getHotelProfitByBranchAndSheet;
