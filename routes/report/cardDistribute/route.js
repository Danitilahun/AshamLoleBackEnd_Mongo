const express = require("express");
const createCardDistributeAndDailyCredit = require("../../../controllers/report/cardDistribute");
const getCardDistributeByBranchAndSheet = require("../../../controllers/report/get/getCardDistributeByBranchAndSheet");

const router = express.Router();

router.get("/", getCardDistributeByBranchAndSheet);

router.post("/", createCardDistributeAndDailyCredit);

module.exports = router;
