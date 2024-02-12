const express = require("express");
const router = express.Router();

const asbezaRoute = require("./asbeza/route");
const cardRoute = require("./card/route");
const wifiRoute = require("./wifi/route");
const waterRoute = require("./water/route");
const {
  getCustomersByBranchId,
} = require("../../controllers/customer/getCustomersByBranchId");
const {
  getAllCustomers,
} = require("../../controllers/customer/getAllCustomers");

router.use("/asbeza", asbezaRoute);
router.use("/card", cardRoute);
router.use("/wifi", wifiRoute);
router.use("/water", waterRoute);
router.get("/customer/single", getCustomersByBranchId);
router.get("/customer/", getAllCustomers);
module.exports = router;
