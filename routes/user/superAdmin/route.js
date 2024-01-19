const express = require("express");
const createSuperadmin = require("../../../controllers/users/superAdmin/create");
const editSuperadmin = require("../../../controllers/users/superAdmin/edit");
const getSuperAdmin = require("../../../controllers/users/superAdmin/get");

const router = express.Router();

// Define the route for creating data for an admin
router.get("/", getSuperAdmin);
router.post("/", createSuperadmin);
router.put("/:id", editSuperadmin);

module.exports = router;
