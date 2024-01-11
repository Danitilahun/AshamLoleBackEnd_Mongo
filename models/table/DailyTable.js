const mongoose = require("mongoose");

// Define a subdocument schema for person and work
const PersonWorkSchema = new mongoose.Schema({
  person: { type: String, required: true }, // Delivery Guy ID
  work: { type: String, required: true }, // Delivery Guy Work ID
});

// Define DailyTable schema
const DailyTableSchema = new mongoose.Schema({
  personWork: [PersonWorkSchema], // Array of objects containing person and work
  branchId: { type: String, required: true }, // Branch ID
  sheetId: { type: String, required: true }, // Sheet ID
});

// Create model using the schema
const DailyTable = mongoose.model("DailyTable", DailyTableSchema);

module.exports = DailyTable;
