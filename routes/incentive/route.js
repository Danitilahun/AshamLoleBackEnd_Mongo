const express = require("express");
const router = express.Router();

const penalityRoute = require("./penality/route");
const bonusRoute = require("./bonus/route");

router.use("/penality", penalityRoute);
router.use("/bonus", bonusRoute);

module.exports = router;
