const express = require("express");
const createAdmin = require("../../../controllers/users/admin/create");
const editAdmin = require("../../../controllers/users/admin/edit");
const deleteAdmin = require("../../../controllers/users/admin/delete");

const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getAllAdmin);

// Create a new expense
router.post("/", createAdmin);

// Update an existing expense
router.put("/:id", editAdmin);

// Delete an expense
router.delete("/:id", deleteAdmin);

module.exports = router;
