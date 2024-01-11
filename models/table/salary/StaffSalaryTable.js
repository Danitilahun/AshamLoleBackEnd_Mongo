const mongoose = require("mongoose");

// Define a subdocument schema for person and work
const PersonWorkSchema = new mongoose.Schema({
  person: { type: String, required: true }, // Person ID (can be Delivery Guy ID or Staff ID)
  work: { type: String, required: true }, // Work ID
});

// Define StaffSalaryTable schema
const StaffSalaryTableSchema = new mongoose.Schema({
  personWork: [PersonWorkSchema], // Array of objects containing person and work
  branchId: { type: String, required: true }, // Branch ID
  sheetId: { type: String, required: true }, // Sheet ID
});

// Create model using the schema
const StaffSalaryTable = mongoose.model(
  "StaffSalaryTable",
  StaffSalaryTableSchema
);

module.exports = StaffSalaryTable;
