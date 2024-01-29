const express = require("express");
const createHotelProfitAndDailyCredit = require("../../../controllers/report/hotelProfit");
const getHotelProfitByBranchAndSheet = require("../../../controllers/report/get/getHotelProfitByBranchAndSheet");
const {
  searchHotelProfits,
} = require("../../../controllers/report/search/search");

const router = express.Router();

router.get("/search", searchHotelProfits);
router.get("/", getHotelProfitByBranchAndSheet);

router.post("/", createHotelProfitAndDailyCredit);

module.exports = router;
