const express = require("express");
const createWaterDistributeAndDailyCredit = require("../../../controllers/report/waterDistribute");
const getWaterDistributeByBranchAndSheet = require("../../../controllers/report/get/getWaterDistributeByBranchAndSheet");
const {
  searchWaterDistributes,
} = require("../../../controllers/report/search/search");

const router = express.Router();

router.get("/search", searchWaterDistributes);
router.get("/", getWaterDistributeByBranchAndSheet);
router.post("/", createWaterDistributeAndDailyCredit);

module.exports = router;
