const express = require("express");
const {
  createCompanyGain,
} = require("../../../controllers/gainPrice/Company/create");
const updateCompanyGainField = require("../../../controllers/gainPrice/Company/update");
const getCompanyGain = require("../../../controllers/gainPrice/Company/getCompanyGain");
const router = express.Router();

router.get("/", getCompanyGain);
router.post("/", createCompanyGain);
router.put("/:id", updateCompanyGainField);

module.exports = router;
