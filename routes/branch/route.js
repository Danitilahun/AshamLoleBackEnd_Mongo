// Import required modules
const express = require("express");
const createBranch = require("../../controllers/branch/create");
const editBranch = require("../../controllers/branch/edit");
const router = express.Router();

// Define the route for creating data for an admin
router.post("/", createBranch);
router.put("/:id", editBranch);
module.exports = router;
