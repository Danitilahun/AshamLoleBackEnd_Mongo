const mongoose = require("mongoose");

const wifiSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    activeDailySummery: {
      type: String,
      required: true,
    },
    activeTable: {
      type: String,
      required: true,
    },
    blockHouse: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    branchKey: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    callcenterId: {
      type: String,
      required: true,
    },
    callcenterName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    createdDate: {
      type: String,
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
    fromWhere: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Wifi = mongoose.model("Wifi", wifiSchema);

module.exports = Wifi;
