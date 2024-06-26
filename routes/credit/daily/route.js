const express = require("express");
const createCredit = require("../../../controllers/credit/dailyCredit/create");
const getDailyCreditsByBranchId = require("../../../controllers/credit/dailyCredit/getByBranchId");
const editCredit = require("../../../controllers/credit/dailyCredit/edit");
const deleteCredit = require("../../../controllers/credit/dailyCredit/delete");
const router = express.Router();

router.get("/", getDailyCreditsByBranchId);
router.post("/", createCredit);
router.put("/:creditId", editCredit);
router.delete("/:creditId", deleteCredit);

module.exports = router;
