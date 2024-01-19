const express = require("express");
const {
  createCompanyGain,
} = require("../../../controllers/gainPrice/Company/create");
const updateCompanyGainField = require("../../../controllers/gainPrice/Company/update");
const getCompanyGain = require("../../../controllers/gainPrice/Company/getCompanyGain");
const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getCompanyGain);

// Create a new expense
router.post("/", createCompanyGain);

// Update an existing expense
router.put("/:id", updateCompanyGainField);

module.exports = router;
