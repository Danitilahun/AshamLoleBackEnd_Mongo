const express = require("express");
const createDashboard = require("../../controllers/dashboard/create");
const router = express.Router();

router.post("/", createDashboard);

module.exports = router;
