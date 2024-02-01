const express = require("express");
const createDailyTable = require("../../controllers/dailyTable/create");
const getDailyTableDetails = require("../../controllers/dailyTable/getTableBysheetId");
const router = express.Router();

router.post("/", createDailyTable);
router.get("/:id", getDailyTableDetails);
module.exports = router;
