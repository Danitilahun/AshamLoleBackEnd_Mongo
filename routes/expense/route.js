const express = require("express");
const createExpense = require("../../controllers/expense/create");
const deleteExpense = require("../../controllers/expense/delete");
const updateExpense = require("../../controllers/expense/edit");
const getAllExpenses = require("../../controllers/expense/get");

const router = express.Router();
console.log("here");

router.get("/", getAllExpenses);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;
