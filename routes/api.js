const express = require("express");
const router = express.Router();
const DashboardRoute = require("./dashboard/route");
const BranchRoute = require("./branch/route");
const BankRoute = require("./bank/route");
const CalculateRoute = require("./calculator/route");
const CreditRoute = require("./credit/route");
const CustomerRoute = require("./customer/route");
const DailyTableRoute = require("./dailytable/route");
const UserRoute = require("./user/route");
const EssentialRoute = require("./essential/route");
const ExpenseRoute = require("./expense/route");
const OrderRoute = require("./order/route");
const ReportRoute = require("./report/route");
const IncentiveRoute = require("./incentive/route");
const SheetRoute = require("./sheet/route");
const GainPriceRoute = require("./gainprice/route");
const verifyRoles = require("../middlewares/verifyRoles");

// Use sub-routes under "/api"
router.use("/dashboard", verifyRoles(process.env.SUPERADMIN), DashboardRoute);
router.use("/branch", verifyRoles(process.env.SUPERADMIN), BranchRoute);
router.use("/bank", BankRoute);
router.use("/calculator", CalculateRoute);
router.use("/credit", CreditRoute);
router.use("/customer", CustomerRoute);
router.use("/dailytable", DailyTableRoute);
router.use("/user", UserRoute);
router.use("/essential", EssentialRoute);
router.use("/expense", ExpenseRoute);
router.use("/order", OrderRoute);
router.use("/report", ReportRoute);
router.use("/incentive", IncentiveRoute);
router.use("/sheet", SheetRoute);
router.use("/gainprice", GainPriceRoute);

module.exports = router;
