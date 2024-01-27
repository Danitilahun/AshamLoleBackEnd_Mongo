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
    sum: {
      type: Number,
      default: 0,
    },
    branchId: {
      type: String,
      required: true,
    },
  },
  { strict: true, timestamps: true }
);

const Calculator = mongoose.model("Calculator", calculatorSchema);

module.exports = Calculator;
