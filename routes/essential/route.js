const express = require("express");
const createEssentials = require("../../controllers/essentials/create");
const deleteEssentials = require("../../controllers/essentials/delete");
const editEssentials = require("../../controllers/essentials/edit");
const getAllEssentials = require("../../controllers/essentials/get");
const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getAllEssentials);

// Create a new expense
router.post("/", createEssentials);

// Update an existing expense
router.put("/:id", editEssentials);

// Delete an expense
router.delete("/:id", deleteEssentials);

module.exports = router;
