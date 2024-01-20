const express = require("express");
const createCredit = require("../../../controllers/credit/customerCredit/create");
const editCredit = require("../../../controllers/credit/customerCredit/edit");
const deleteCredit = require("../../../controllers/credit/customerCredit/delete");
const getCustomerCreditsByBranchId = require("../../../controllers/credit/customerCredit/getByBranchId");
const router = express.Router();

router.get("/", getCustomerCreditsByBranchId);
router.post("/", createCredit);
router.put("/:id", editCredit);
router.delete("/:id", deleteCredit);

module.exports = router;
