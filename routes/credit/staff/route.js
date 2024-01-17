const express = require("express");
const createStaffCredit = require("../../../controllers/credit/staffCredit/create");
const editStaffCredit = require("../../../controllers/credit/staffCredit/edit");
const deleteCredit = require("../../../controllers/credit/staffCredit/delete");
const getStaffCreditsByBranchId = require("../../../controllers/credit/staffCredit/getByBranchId");
const router = express.Router();

// Define the route for creating data for an admin
router.get("/", getStaffCreditsByBranchId);

// Create a new expense
router.post("/", createStaffCredit);

// Update an existing expense
router.put("/:id", editStaffCredit);

// Delete an expense
router.delete("/:id", deleteCredit);

module.exports = router;
