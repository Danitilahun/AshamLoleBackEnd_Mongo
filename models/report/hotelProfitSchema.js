const mongoose = require("mongoose");

const hotelProfitSchema = new mongoose.Schema(
  {
    sheetId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    deliveryguyId: {
      type: String,
      required: true,
    },
    deliveryguyName: {
      type: String,
      required: true,
    },
    gain: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const HotelProfit = mongoose.model("HotelProfit", hotelProfitSchema);

module.exports = HotelProfit;
