const express = require("express");
const createFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/create");
const editFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/edit");
const deleteFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/delete");
const getFinanceCreditsByBranchId = require("../../../controllers/credit/financeCredit/getByBranchId");
const router = express.Router();

router.get("/", getFinanceCreditsByBranchId);
router.post("/", createFinanceCreditAndUpdate);
router.put("/:id", editFinanceCreditAndUpdate);
router.delete("/:id", deleteFinanceCreditAndUpdate);

module.exports = router;
