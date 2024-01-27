const mongoose = require("mongoose");
const bankNames = require("../util/bankNames");

const bankSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      enum: bankNames,
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
      enum: ["branch", "finance"],
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["Withdrawal", "Deposit"],
    },
  },
  { strict: true, timestamps: true }
);

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
