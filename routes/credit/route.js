const express = require("express");
const router = express.Router();
const customerCredit = require("./customer/route");
const staffCredit = require("./staff/route");
const financeCredit = require("./finance/route");
const dailyCredit = require("./daily/route");

// Define the route for creating data for an admin
router.use("/customer", customerCredit);
router.use("/staff", staffCredit);
router.use("/finance", financeCredit);
router.use("/daily", dailyCredit);

module.exports = router;
