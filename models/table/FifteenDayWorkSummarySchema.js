const mongoose = require("mongoose");

// Define a subdocument schema for day and daily work
const DailyWorkSchema = new mongoose.Schema({
  day: { type: String }, // Day
  dailyWork: { type: String }, // Daily Work Summary
});

// Define 15-Day Work Summary schema
const FifteenDayWorkSummarySchema = new mongoose.Schema({
  dailyWorkSummary: [DailyWorkSchema], // Array of objects containing day and daily work
  branchId: { type: String, required: true }, // Branch ID
  sheetId: { type: String, required: true }, // Sheet ID
});

// Create model using the schema
const FifteenDayWorkSummary = mongoose.model(
  "FifteenDayWorkSummary",
  FifteenDayWorkSummarySchema
);

module.exports = FifteenDayWorkSummary;
