const mongoose = require("mongoose");

// Define the schema for branchSheetSummary
const branchSheetSummarySchema = new mongoose.Schema({
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },

  sheetSummary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SheetStatus",
    },
  ],

  budget: {
    type: Number,
    default: 0,
  },

  netGain: {
    type: Number,
    default: 0,
  },

  totalExpense: {
    type: Number,
    default: 0,
  },

  totalIncome: {
    type: Number,
    default: 0,
  },
});

// Create and export the model
const BranchSheetSummary = mongoose.model(
  "BranchSheetSummary",
  branchSheetSummarySchema
);

module.exports = BranchSheetSummary;
