const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SheetsSchema = new Schema({
  Tables: [String],
  active: String,
  activeDailySummary: String,
  branchId: String,
  createdAt: { type: Date, default: Date.now },
  date: String,
  name: String,
  prevActive: String,
  previousActive: String,
  realDate: String,
  sheetNumber: Number,
  sheetStatus: String,
  tableDate: [String],
  tableCount: Number,
});

const Sheet = mongoose.model("Sheets", SheetsSchema);

module.exports = Sheet;
