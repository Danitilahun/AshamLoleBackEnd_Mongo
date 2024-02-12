const HotelProfit = require("../../../models/report/hotelProfitSchema");

// Controller function to fetch paginated HotelProfit by branchId and sheetId
const getHotelProfitByBranchAndSheet = async (req, res) => {
  try {
    const { branchId, page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate skip value for pagination
    const skip = (pageNumber - 1) * limitNumber;

    if (!branchId) {
      return res
        .status(400)
        .json({ error: "Both branchId and sheetId are required." });
    }

    // Fetch paginated HotelProfit records matching the provided branchId and sheetId
    const hotelProfitData = await HotelProfit.find({ branchId })
      .skip(skip)
      .limit(limitNumber)
      .sort({ updatedAt: -1 });

    console.log("hotelProfitData", hotelProfitData);
    return res.json(hotelProfitData);
  } catch (error) {
    console.error("Error in fetching HotelProfit:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getHotelProfitByBranchAndSheet;
