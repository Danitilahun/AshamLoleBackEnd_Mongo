const mongoose = require("mongoose");
const bankNames = require("../../util/bankNames");

const branchBankTotalSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    withdraw: {
      type: Number,
      default: 0,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    banks: [
      {
        name: {
          type: String,
          enum: bankNames,
        },
        total: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const BranchBankTotal = mongoose.model(
  "BranchBankTotal",
  branchBankTotalSchema
);

module.exports = BranchBankTotal;
