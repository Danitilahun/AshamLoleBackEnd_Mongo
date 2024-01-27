const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SheetsSchema = new Schema(
  {
    Tables: [String],
    activeDailySummery: String,
    activeDGSummery: String,
    branchId: String,
    date: String,
    name: String,
    previousActive: String,
    realDate: String,
    sheetNumber: Number,
    sheetStatus: String,
    tableCount: Number,
  },
  { strict: true, timestamps: true }
);

const Sheet = mongoose.model("Sheets", SheetsSchema);

module.exports = Sheet;
