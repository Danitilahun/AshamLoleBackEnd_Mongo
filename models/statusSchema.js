const mongoose = require("mongoose");

const otherFieldsSchema = new mongoose.Schema({
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
      required: true,
    },
    totalDeliveryGuySalary: {
      type: Number,
      required: true,
    },
    totalExpense: {
      type: Number,
      required: true,
    },
    totalIncome: {
      type: Number,
      required: true,
    },
    totalStaffSalary: {
      type: Number,
      required: true,
    },
    totaltax: {
      type: Number,
      required: true,
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
    otherFields: [otherFieldsSchema],
  },
  { timestamps: true }
);

const StatusSchema = mongoose.model("Status", statusSchema);

module.exports = StatusSchema;
