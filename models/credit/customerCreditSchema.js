const mongoose = require("mongoose");

const customerCreditSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    daysSinceBorrowed: {
      type: Number,
      default: 0,
    },
    borrowedOn: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    date: {
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
    reason: {
      type: String,
      required: true,
    },
  },
  { strict: true, timestamps: true }
);

const CustomerCredit = mongoose.model("CustomerCredit", customerCreditSchema);

module.exports = CustomerCredit;
