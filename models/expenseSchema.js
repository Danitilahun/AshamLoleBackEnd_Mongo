const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    financeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseSchema = mongoose.model("Expense", expenseSchema);

module.exports = ExpenseSchema;
