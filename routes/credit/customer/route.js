const express = require("express");
const createCredit = require("../../../controllers/credit/customerCredit/create");
const editCredit = require("../../../controllers/credit/customerCredit/edit");
const deleteCredit = require("../../../controllers/credit/customerCredit/delete");
const getCustomerCreditsByBranchId = require("../../../controllers/credit/customerCredit/getByBranchId");
const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getCustomerCreditsByBranchId);

// Create a new expense
router.post("/", createCredit);

// Update an existing expense
router.put("/:id", editCredit);

// Delete an expense
router.delete("/:id", deleteCredit);

module.exports = router;
