const express = require("express");
const createStaffCredit = require("../../../controllers/credit/staffCredit/create");
const editStaffCredit = require("../../../controllers/credit/staffCredit/edit");
const deleteCredit = require("../../../controllers/credit/staffCredit/delete");
const getStaffCreditsByBranchId = require("../../../controllers/credit/staffCredit/getByBranchId");
const router = express.Router();

router.get("/", getStaffCreditsByBranchId);
router.post("/", createStaffCredit);
router.put("/:id", editStaffCredit);
router.delete("/:id", deleteCredit);

module.exports = router;
