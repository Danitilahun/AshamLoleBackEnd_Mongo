const express = require("express");
const createCallCenterEmployee = require("../../../controllers/users/callcenter/create");
const editCallCenterEmployee = require("../../../controllers/users/callcenter/edit");
const getAllCallCenter = require("../../../controllers/users/callcenter/get");

const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getAllCallCenter);

// Create a new expense
router.post("/", createCallCenterEmployee);

// Update an existing expense
router.put("/:id", editCallCenterEmployee);

module.exports = router;
