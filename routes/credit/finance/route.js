const express = require("express");
const createFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/create");
const editFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/edit");
const deleteFinanceCreditAndUpdate = require("../../../controllers/credit/financeCredit/delete");
const getFinanceCreditsByBranchId = require("../../../controllers/credit/financeCredit/getByBranchId");
const router = express.Router();

// Define the route for creating data for an admin
router.get("/", getFinanceCreditsByBranchId);

// Create a new expense
router.post("/", createFinanceCreditAndUpdate);

// Update an existing expense
router.put("/:id", editFinanceCreditAndUpdate);

// Delete an expense
router.delete("/:id", deleteFinanceCreditAndUpdate);

module.exports = router;
