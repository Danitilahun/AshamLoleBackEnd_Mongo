const express = require("express");
const router = express.Router();
const DashboardRoute = require("./dashboard/route");
const BranchRoute = require("./branch/route");
const BankRoute = require("./bank/route");
const CalculateRoute = require("./calculator/route");
const CreditRoute = require("./credit/route");

// Use sub-routes under "/api"
router.use("/dashboard", DashboardRoute);
router.use("/branch", BranchRoute);
router.use("/bank", BankRoute);
router.use("/calculator", CalculateRoute);
router.use("/credit", CreditRoute);

module.exports = router;
