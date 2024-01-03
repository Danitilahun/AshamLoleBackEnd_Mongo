const express = require("express");
const router = express.Router();
const DashboardRoute = require("./dashboard/dashboard");

// Use sub-routes under "/api"
router.use("/dashboard", DashboardRoute);

module.exports = router;
