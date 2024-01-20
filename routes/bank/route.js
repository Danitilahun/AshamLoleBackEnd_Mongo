// Import required modules
const express = require("express");
const createBankTransaction = require("../../controllers/bank/create");
const getBankFromBanksByName = require("../../controllers/bank/getBankInformationByBankName");
const getBranchBankTotalByBranchId = require("../../controllers/bank/getBranchBankInfo");
const router = express.Router();

router.get("/branch/:branchId", getBranchBankTotalByBranchId);
router.get("/:bankName", getBankFromBanksByName);
router.post("/", createBankTransaction);

module.exports = router;
