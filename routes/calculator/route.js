// Import required modules
const express = require("express");
const editCalculatorNumbersById = require("../../controllers/calculator/update");
const getCalculatorById = require("../../controllers/calculator/get");
const router = express.Router();

router.put("/:calculatorId", editCalculatorNumbersById);
router.get("/:calculatorId", getCalculatorById);

module.exports = router;
