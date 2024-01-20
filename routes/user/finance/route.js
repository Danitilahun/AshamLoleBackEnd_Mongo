const express = require("express");
const createFinanceEntry = require("../../../controllers/users/finance/create");
const editFinanceEntry = require("../../../controllers/users/finance/edit");
const getAllFinance = require("../../../controllers/users/finance/get");

const router = express.Router();

router.get("/", getAllFinance);
router.post("/", createFinanceEntry);
router.put("/:id", editFinanceEntry);

module.exports = router;
