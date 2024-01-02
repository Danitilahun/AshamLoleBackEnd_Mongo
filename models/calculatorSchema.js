const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema(
  {
    1: {
      type: Number,
      default: 0,
    },
    10: {
      type: Number,
      default: 0,
    },
    100: {
      type: Number,
      default: 0,
    },
    200: {
      type: Number,
      default: 0,
    },
    5: {
      type: Number,
      default: 0,
    },
    50: {
      type: Number,
      default: 0,
    },
    sheetId: {
      type: String,
      required: true,
    },
    actual: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    bank: {
      type: Number,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    dailyCredit: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    totalCredit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CalculatorSchema = mongoose.model("Calculator", calculatorSchema);

module.exports = CalculatorSchema;
