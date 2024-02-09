// Import required modules
const express = require("express");
const createBankTransaction = require("../../controllers/bank/create");
const getBankFromBanksByName = require("../../controllers/bank/getBankInformationByBankName");
const getBranchBankTotalByBranchId = require("../../controllers/bank/getBranchBankInfo");
const router = express.Router();

router.get("/:branchId", getBranchBankTotalByBranchId);
router.get("/", getBankFromBanksByName);
router.post("/", createBankTransaction);

module.exports = router;
