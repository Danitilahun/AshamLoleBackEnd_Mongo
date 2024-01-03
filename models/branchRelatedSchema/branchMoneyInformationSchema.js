const mongoose = require("mongoose");

// Schema for branchMoneyInformation
const branchMoneyInformationSchema = new mongoose.Schema(
  {
    BranchName: {
      type: String,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    uniqueName: {
      type: String,
      required: true,
    },

    BranchIncome: {
      type: Number,
      default: 0,
    },
    BranchExpense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BranchMoneyInformation = mongoose.model(
  "BranchMoneyInformation",
  branchMoneyInformationSchema
);

module.exports = BranchMoneyInformation;
