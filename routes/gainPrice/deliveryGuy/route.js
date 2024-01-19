const express = require("express");
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
