const mongoose = require("mongoose");

// Define a subdocument schema for person and work
const PersonWorkSchema = new mongoose.Schema({
  person: { type: String, required: true }, // Delivery Guy ID
  work: { type: String, required: true }, // Delivery Guy Work ID
});

// Define DeliveryGuy15DayWorkSummary schema
const DeliveryGuy15DayWorkSummarySchema = new mongoose.Schema({
  personWork: [PersonWorkSchema], // Array of objects containing person and work
  branchId: { type: String, required: true }, // Branch ID
  sheetId: { type: String, required: true }, // Sheet ID
});

// Create model using the schema
const DeliveryGuy15DayWorkSummary = mongoose.model(
  "DeliveryGuy15DayWorkSummary",
  DeliveryGuy15DayWorkSummarySchema
);

module.exports = DeliveryGuy15DayWorkSummary;
