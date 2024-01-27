const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    Asbeza: {
      type: String,
      default: "No",
    },
    Card: {
      type: String,
      default: "No",
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
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  { strict: true, timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
