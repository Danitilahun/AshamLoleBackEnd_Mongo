const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    bankName: {
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
    placement: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
      enum: ["branch", "finance"],
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["Withdrawal", "Deposit"],
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
