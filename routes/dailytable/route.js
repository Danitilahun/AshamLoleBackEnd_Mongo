const express = require("express");
const createDailyTable = require("../../controllers/dailyTable/create");
const router = express.Router();

router.post("/", createDailyTable);
// router.get("/:id", expenseController.getExpenseById);

module.exports = router;
