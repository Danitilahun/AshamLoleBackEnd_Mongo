const mongoose = require("mongoose");

const customerCreditSchema = new mongoose.Schema(
  {
    active: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    borrowedOn: {
      type: Date,
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
    daysSinceBorrowed: {
      type: Number,
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
  { timestamps: true }
);

const CustomerCreditSchema = mongoose.model(
  "CustomerCredit",
  customerCreditSchema
);

module.exports = CustomerCreditSchema;
