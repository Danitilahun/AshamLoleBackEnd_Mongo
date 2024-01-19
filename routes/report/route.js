const express = require("express");
const router = express.Router();

const cardFeeRoute = require("./cardFee/route");
const cardDistributeRoute = require("./cardDistribute/route");
const wifiDistributeRoute = require("./wifiDistribute/route");
const waterDistributeRoute = require("./waterDistribute/route");
const hotelProfitRoute = require("./hotelProfit/route");

router.use("/cardFee", cardFeeRoute);
router.use("/cardDistribute", cardDistributeRoute);
router.use("/wifiDistribute", wifiDistributeRoute);
router.use("/waterDistribute", waterDistributeRoute);
router.use("/hotelProfit", hotelProfitRoute);

module.exports = router;
