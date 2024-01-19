const express = require("express");
const router = express.Router();

const asbezaRoute = require("./asbeza/route");
const cardRoute = require("./card/route");
const wifiRoute = require("./wifi/route");
const waterRoute = require("./water/route");

router.use("/asbeza", asbezaRoute);
router.use("/card", cardRoute);
router.use("/wifi", wifiRoute);
router.use("/water", waterRoute);
module.exports = router;
