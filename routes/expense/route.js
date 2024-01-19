const express = require("express");
const createExpense = require("../../controllers/expense/create");
const deleteExpense = require("../../controllers/expense/delete");
const updateExpense = require("../../controllers/expense/edit");
const getAllExpenses = require("../../controllers/expense/get");
const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getAllExpenses);

// Create a new expense
router.post("/", createExpense);

// Update an existing expense
router.put("/:id", updateExpense);

// Delete an expense
router.delete("/:id", deleteExpense);

module.exports = router;
