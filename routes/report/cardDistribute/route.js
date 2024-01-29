const express = require("express");
const createCardDistributeAndDailyCredit = require("../../../controllers/report/cardDistribute");
const getCardDistributeByBranchAndSheet = require("../../../controllers/report/get/getCardDistributeByBranchAndSheet");
const {
  searchCardDistributes,
} = require("../../../controllers/report/search/search");

const router = express.Router();

router.get("/search", searchCardDistributes);
router.get("/", getCardDistributeByBranchAndSheet);
router.post("/", createCardDistributeAndDailyCredit);

module.exports = router;
