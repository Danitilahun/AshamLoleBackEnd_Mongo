const express = require("express");
const createCredit = require("../../../controllers/credit/dailyCredit/create");
const getDailyCreditsByBranchId = require("../../../controllers/credit/dailyCredit/getByBranchId");
const editCredit = require("../../../controllers/credit/dailyCredit/edit");
const deleteCredit = require("../../../controllers/credit/dailyCredit/delete");
const router = express.Router();

// Define the route for creating data for an admin
router.get("/", getDailyCreditsByBranchId);

// Create a new expense
router.post("/", createCredit);

// Update an existing expense
router.put("/:id", editCredit);

// Delete an expense
router.delete("/:id", deleteCredit);

module.exports = router;
