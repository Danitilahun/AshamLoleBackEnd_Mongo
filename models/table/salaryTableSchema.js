const mongoose = require("mongoose");

// Define a subdocument schema for person and work
const PersonWorkSchema = new mongoose.Schema({
  person: { type: String, required: true }, // Delivery Guy ID
  work: { type: String, required: true }, // Delivery Guy Work ID
});

// Define SalaryTable schema (similar to DeliveryGuy15DayWorkSummary)
const SalaryTableSchema = new mongoose.Schema({
  personWork: [PersonWorkSchema], // Array of objects containing person and work
  branchId: { type: String, required: true }, // Branch ID
  sheetId: { type: String, required: true }, // Sheet ID
});

// Create model using the schema
const SalaryTable = mongoose.model("SalaryTable", SalaryTableSchema);

module.exports = SalaryTable;
