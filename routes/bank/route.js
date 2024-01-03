// Import required modules
const express = require("express");
const createBankTransaction = require("../../controllers/bank/create");
const router = express.Router();

// Define the route for creating data for an admin
router.post("/", createBankTransaction);

module.exports = router;
