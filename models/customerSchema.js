const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    Asbeza: {
      type: String,
      default: "No",
    },
    Card: {
      type: String,
      default: "Yes",
    },
    Water: {
      type: String,
      default: "No",
    },
    Wifi: {
      type: String,
      default: "No",
    },
    blockHouse: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    branchName: {
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
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;