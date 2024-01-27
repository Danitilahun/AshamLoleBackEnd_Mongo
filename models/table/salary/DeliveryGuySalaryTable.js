const mongoose = require("mongoose");

// Define a subdocument schema for person and work
const PersonWorkSchema = new mongoose.Schema({
  person: { type: String, required: true }, // Person ID (can be Delivery Guy ID or Staff ID)
  work: { type: String, required: true }, // Work ID
});

// Define DeliveryGuySalaryTable schema
const DeliveryGuySalaryTableSchema = new mongoose.Schema(
  {
    personWork: [PersonWorkSchema], // Array of objects containing person and work
    branchId: { type: String, required: true }, // Branch ID
    sheetId: { type: String, required: true }, // Sheet ID
  },
  { strict: true, timestamps: true }
);

// Create model using the schema
const DeliveryGuySalaryTable = mongoose.model(
  "DeliveryGuySalaryTable",
  DeliveryGuySalaryTableSchema
);

module.exports = DeliveryGuySalaryTable;
