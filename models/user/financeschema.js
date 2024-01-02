const mongoose = require("mongoose");

const financeschema = new mongoose.Schema(
  {
    BudgetSummery: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    bank: {
      type: [String],
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    salary: {
      type: Number,
      required: true,
    },
    securityAddress: {
      type: String,
      required: true,
    },
    securityName: {
      type: String,
      required: true,
    },
    securityPhone: {
      type: String,
      required: true,
    },
    totalExpense: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Finance = mongoose.model("Finance", financeschema);

module.exports = Finance;
