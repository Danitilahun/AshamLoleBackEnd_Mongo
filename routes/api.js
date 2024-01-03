const express = require("express");
const router = express.Router();
const DashboardRoute = require("./dashboard/route");
const BranchRoute = require("./branch/route");
const BankRoute = require("./bank/route");

// Use sub-routes under "/api"
router.use("/dashboard", DashboardRoute);
router.use("/branch", BranchRoute);
router.use("/bank", BankRoute);

module.exports = router;
