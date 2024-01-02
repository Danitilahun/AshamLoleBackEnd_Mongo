const mongoose = require("mongoose");

// Schema for branchMoneyInformation
const branchMoneyInformationSchema = new mongoose.Schema({
  BranchName: String,
  ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch", // Reference to the Branch collection
  },
  uniqueName: String,
  BranchIncome: {
    type: Number,
    default: 0,
  },
  BranchExpense: {
    type: Number,
    default: 0,
  },
});

const BranchMoneyInformation = mongoose.model(
  "BranchMoneyInformation",
  branchMoneyInformationSchema
);

module.exports = BranchMoneyInformation;
