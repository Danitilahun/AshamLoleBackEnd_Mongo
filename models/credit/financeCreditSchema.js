const mongoose = require("mongoose");

const financeCreditSchema = new mongoose.Schema(
  {
    amount: {
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
    date: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    placement: {
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

const FinanceCreditSchema = mongoose.model(
  "FinanceCredit",
  financeCreditSchema
);

module.exports = FinanceCreditSchema;
