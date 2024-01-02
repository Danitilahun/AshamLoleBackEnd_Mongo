const mongoose = require("mongoose");

const branchDashboardDataSchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch", // Reference to the Branch collection
  },
  branchData: {
    BranchName: String,
    Asbeza_P: {
      type: Number,
      default: 0,
    },
    CardDistribute: {
      type: Number,
      default: 0,
    },
    WaterDistribute: {
      type: Number,
      default: 0,
    },
    WifiDistribute: {
      type: Number,
      default: 0,
    },
    HotelProfit: {
      type: Number,
      default: 0,
    },
    TotalProfit: {
      type: Number,
      default: 0,
    },
    TotalExpense: {
      type: Number,
      default: 0,
    },
    Status: {
      type: Number,
      default: 0,
    },
  },
});

const BranchDashboardData = mongoose.model(
  "BranchDashboardData",
  branchDashboardDataSchema
);

module.exports = BranchDashboardData;
