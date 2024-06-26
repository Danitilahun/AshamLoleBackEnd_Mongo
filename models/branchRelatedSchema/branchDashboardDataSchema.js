const mongoose = require("mongoose");

const branchDashboardDataSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    BranchName: {
      type: String,
      required: true,
    },
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

  { timestamps: true }
);

const BranchDashboardData = mongoose.model(
  "BranchDashboardData",
  branchDashboardDataSchema
);

module.exports = BranchDashboardData;
