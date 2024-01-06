const mongoose = require("mongoose");

const othersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const statusSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
    },
    createdDate: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    ethioTelAccount: {
      type: String,
      required: true,
    },
    ethioTelBill: {
      type: Number,
      required: true,
    },
    ethioTelOwnerName: {
      type: String,
      required: true,
    },
    houseRent: {
      type: Number,
      required: true,
    },
    houseRentAccount: {
      type: String,
      required: true,
    },
    houseRentOwnerName: {
      type: String,
      required: true,
    },
    taxPersentage: {
      type: Number,
      default: 0,
    },
    totalDeliveryGuySalary: {
      type: Number,
      default: 0,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalStaffSalary: {
      type: Number,
      default: 0,
    },
    totaltax: {
      type: Number,
      default: 0,
    },
    wifi: {
      type: Number,
      required: true,
    },
    wifiAccount: {
      type: String,
      required: true,
    },
    wifiOwnerName: {
      type: String,
      required: true,
    },
    others: [othersSchema],
  },
  { timestamps: true }
);

const StatusSchema = mongoose.model("Status", statusSchema);

module.exports = StatusSchema;
