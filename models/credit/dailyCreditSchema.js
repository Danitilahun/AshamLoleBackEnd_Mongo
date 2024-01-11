const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common schema without the 'source' property
const DailyCreditSchema = new Schema({
  sheetId: {
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
  deliveryguyId: {
    type: String,
    required: true,
  },
  deliveryguyName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
});

// DailyCredit model without 'source'
const DailyCredit = mongoose.model("DailyCredit", DailyCreditSchema);

// Enum for DailyExpenseCredit source
const expenseCreditSources = [
  "cardFee",
  "cardDistribute",
  "waterDistribute",
  "wifiDistribute",
  "hotelProfit",
];

// Schema for DailyExpenseCredit with 'source' enum
const DailyExpenseCreditSchema = new Schema({
  ...DailyCreditSchema.obj, // Include properties from the common schema
  source: {
    type: String,
    enum: expenseCreditSources,
    required: true,
  },
});

const DailyExpenseCredit = mongoose.model(
  "DailyExpenseCredit",
  DailyExpenseCreditSchema
);

// Enum for DailyGainCredit source
const gainCreditSources = [
  "cardDistribute",
  "waterDistribute",
  "wifiDistribute",
];

// Schema for DailyGainCredit with 'source' enum
const DailyGainCreditSchema = new Schema({
  ...DailyCreditSchema.obj, // Include properties from the common schema
  source: {
    type: String,
    enum: gainCreditSources,
    required: true,
  },
});

const DailyGainCredit = mongoose.model(
  "DailyGainCredit",
  DailyGainCreditSchema
);

module.exports = {
  DailyCredit,
  DailyExpenseCredit,
  DailyGainCredit,
};
