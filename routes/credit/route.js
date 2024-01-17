const express = require("express");
const router = express.Router();

// Define the route for creating data for an admin
router.use("/customer");
router.use("/staff");
router.use("/finance");
router.use("/daily");

module.exports = router;
