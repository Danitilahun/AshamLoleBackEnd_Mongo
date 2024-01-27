const mongoose = require("mongoose");

const penaltySchema = new mongoose.Schema(
  {
    active: {
      type: String,
      required: true,
    },
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
  { strict: true, timestamps: true }
);

const Penalty = mongoose.model("Penalty", penaltySchema);

module.exports = Penalty;
