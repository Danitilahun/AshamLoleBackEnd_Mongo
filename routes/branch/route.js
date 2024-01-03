// Import required modules
const express = require("express");
const createBranch = require("../../controllers/branch/create");
const router = express.Router();

// Define the route for creating data for an admin
router.post("/", createBranch);

module.exports = router;
