const express = require("express");
const createHotelProfitAndDailyCredit = require("../../../controllers/report/hotelProfit");
const getHotelProfitByBranchAndSheet = require("../../../controllers/report/get/getHotelProfitByBranchAndSheet");

const router = express.Router();

router.get("/", getHotelProfitByBranchAndSheet);

router.post("/", createHotelProfitAndDailyCredit);

module.exports = router;
