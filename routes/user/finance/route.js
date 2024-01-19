const express = require("express");
const createFinanceEntry = require("../../../controllers/users/finance/create");
const editFinanceEntry = require("../../../controllers/users/finance/edit");
const getAllFinance = require("../../../controllers/users/finance/get");
const deleteFinanceEntry = require("../../../controllers/users/finance/delete");

const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getAllFinance);
// Create a new expense
router.post("/", createFinanceEntry);
router.put("/:id", editFinanceEntry);

router.delete("/:id", deleteFinanceEntry);

module.exports = router;
