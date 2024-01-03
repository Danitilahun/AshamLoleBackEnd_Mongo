const express = require("express");
const router = express.Router();
const DashboardRoute = require("./dashboard/route");
const BranchRoute = require("./branch/route");

// Use sub-routes under "/api"
router.use("/dashboard", DashboardRoute);
router.use("/branch", BranchRoute);

module.exports = router;
