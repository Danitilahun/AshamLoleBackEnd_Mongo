const express = require("express");
const router = express.Router();

const companyGainRoute = require("./company/route");
const deliveryGuyGainRoute = require("./deliveryGuy/route");

router.use("/company", companyGainRoute);
router.use("/deliveryGuy", deliveryGuyGainRoute);

module.exports = router;
