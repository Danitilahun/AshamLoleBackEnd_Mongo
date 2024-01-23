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
router.use(
  "/bank",
  verifyRoles(process.env.FINANCE, process.env.ADMIN),
  BankRoute
);
router.use(
  "/calculator",
  verifyRoles(process.env.FINANCE, process.env.ADMIN),
  CalculateRoute
);
router.use(
  "/credit",
  verifyRoles(process.env.FINANCE, process.env.ADMIN),
  CreditRoute
);
router.use(
  "/customer",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  CustomerRoute
);
router.use(
  "/dailytable",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  DailyTableRoute
);
router.use(
  "/user",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  UserRoute
);
router.use(
  "/essential",
  verifyRoles(
    process.env.FINANCE,
    process.env.SUPERADMIN,
    process.env.ADMIN,
    process.env.CALLCENTER
  ),
  EssentialRoute
);
router.use("/expense", verifyRoles(process.env.FINANCE), ExpenseRoute);
router.use(
  "/order",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  OrderRoute
);
router.use(
  "/report",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  ReportRoute
);
router.use(
  "/incentive",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  IncentiveRoute
);
router.use(
  "/sheet",
  verifyRoles(process.env.SUPERADMIN, process.env.ADMIN),
  SheetRoute
);
router.use("/gainprice", verifyRoles(process.env.SUPERADMIN), GainPriceRoute);

module.exports = router;
