const express = require("express");
const router = express.Router();

// Define the route for creating data for an admin
router.use("/", createDashboard);

module.exports = router;
