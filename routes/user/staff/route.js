const express = require("express");

const deleteFinanceEntry = require("../../../controllers/users/finance/delete");
const createStaffMember = require("../../../controllers/users/staff/create");
const editStaffMember = require("../../../controllers/users/staff/edit");
const getAllStaffByBranchId = require("../../../controllers/users/staff/get");
const deleteStaffMember = require("../../../controllers/users/staff/delete");

const router = express.Router();

// Define the route for creating data for an admin

router.get("/", getAllStaffByBranchId);
router.post("/", createStaffMember);
router.put("/:id", editStaffMember);
router.delete("/:id", deleteStaffMember);

module.exports = router;
