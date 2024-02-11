// Import required modules
const express = require("express");
const editCalculatorNumbersById = require("../../controllers/calculator/update");
const getCalculatorById = require("../../controllers/calculator/get");
const router = express.Router();

router.get("/:calculatorId", getCalculatorById);
router.put("/:calculatorId", editCalculatorNumbersById);

module.exports = router;
