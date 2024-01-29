const express = require("express");
const getWifiDistributeByBranchAndSheet = require("../../../controllers/report/get/getWifiDistributeByBranchAndSheet");
const createWifiDistributeAndDailyCredit = require("../../../controllers/report/wifiDistribute");
const {
  searchWifiDistributes,
} = require("../../../controllers/report/search/search");

const router = express.Router();

router.get("/search", searchWifiDistributes);
router.get("/", getWifiDistributeByBranchAndSheet);
router.post("/", createWifiDistributeAndDailyCredit);

module.exports = router;
