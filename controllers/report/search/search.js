const CardDistribute = require("../../../models/report/cardDistributeSchema");
const CardFee = require("../../../models/report/cardFeeSchema");
const HotelProfit = require("../../../models/report/hotelProfitSchema");
const WaterDistribute = require("../../../models/report/waterDistributeSchema");
const WifiDistribute = require("../../../models/report/wifiDistributeSchema");

const searchCardFees = async (req, res) => {
  try {
    const { param, value } = req.query;
    if (!value) {
      return;
    }

    // Update the regex to match values starting with the provided string
    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await CardFee.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchCardDistributes = async (req, res) => {
  try {
    const { param, value } = req.query;
    if (!value) {
      return;
    }

    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await CardDistribute.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchHotelProfits = async (req, res) => {
  try {
    const { param, value } = req.query;
    if (!value) {
      return;
    }

    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await HotelProfit.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchWaterDistributes = async (req, res) => {
  try {
    const { param, value } = req.query;
    if (!value) {
      return;
    }

    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await WaterDistribute.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchWifiDistributes = async (req, res) => {
  try {
    const { param, value } = req.query;
    if (!value) {
      return;
    }

    const searchQuery = {};
    searchQuery[param] = { $regex: new RegExp(`^${value}`, "i") };

    const searchResults = await WifiDistribute.find(searchQuery);

    console.log("searchResults", searchResults);
    res.status(200).json({
      success: true,
      count: searchResults.length,
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  searchCardFees,
  searchCardDistributes,
  searchHotelProfits,
  searchWaterDistributes,
  searchWifiDistributes,
};
