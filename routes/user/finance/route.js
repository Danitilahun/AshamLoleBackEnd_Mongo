const express = require("express");
const createFinanceEntry = require("../../../controllers/users/finance/create");
const editFinanceEntry = require("../../../controllers/users/finance/edit");
const getAllFinance = require("../../../controllers/users/finance/get");
const checkDuplicateEmail = require("../../../middlewares/checkDuplicateEmail");
const checkDuplicateEmailExceptCurrent = require("../../../middlewares/checkDuplicateEmailExceptCurrent");

const router = express.Router();

router.get("/", getAllFinance);
router.post("/", checkDuplicateEmail, createFinanceEntry);
router.put("/:id", checkDuplicateEmailExceptCurrent, editFinanceEntry);

module.exports = router;
