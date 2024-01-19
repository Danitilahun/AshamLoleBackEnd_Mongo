const express = require("express");
const createWaterDistributeAndDailyCredit = require("../../../controllers/report/waterDistribute");
const getWaterDistributeByBranchAndSheet = require("../../../controllers/report/get/getWaterDistributeByBranchAndSheet");

const router = express.Router();

router.get("/", getWaterDistributeByBranchAndSheet);

router.post("/", createWaterDistributeAndDailyCredit);

module.exports = router;
