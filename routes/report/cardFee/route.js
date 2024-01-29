const express = require("express");
const createCardFeeAndDailyCredit = require("../../../controllers/report/cardFee/cardFee");
const recordReturnCard = require("../../../controllers/report/cardFee/returnedcard");
const getCardFeesByBranchAndSheet = require("../../../controllers/report/get/getCardFeesByBranchAndSheet");
const { searchCardFees } = require("../../../controllers/report/search/search");
const router = express.Router();

router.get("/search", searchCardFees);
router.get("/", getCardFeesByBranchAndSheet);

router.post("/", createCardFeeAndDailyCredit);

router.put("/:id", recordReturnCard);

module.exports = router;
