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
    date: {
      type: Date,
      required: true,
    },
    ethioTelBill: {
      type: Number,
      required: true,
    },
    houseRent: {
      type: Number,
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
    others: [othersSchema],
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
