const mongoose = require("mongoose");

const branchTotalCreditSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    customerCredit: {
      type: Number,
      default: 0,
    },
    dailyCredit: {
      type: Number,
      default: 0,
    },
    staffCredit: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BranchTotalCredit = mongoose.model(
  "BranchTotalCredit",
  branchTotalCreditSchema
);

module.exports = BranchTotalCredit;
