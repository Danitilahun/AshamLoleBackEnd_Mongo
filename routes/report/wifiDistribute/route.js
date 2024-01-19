const express = require("express");
const getWifiDistributeByBranchAndSheet = require("../../../controllers/report/get/getWifiDistributeByBranchAndSheet");
const createWifiDistributeAndDailyCredit = require("../../../controllers/report/wifiDistribute");

const router = express.Router();

router.get("/", getWifiDistributeByBranchAndSheet);

router.post("/", createWifiDistributeAndDailyCredit);

module.exports = router;
