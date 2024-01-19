const express = require("express");
const DeliveryGuyHolidayBonus = require("../../../../controllers/incentive/bonus/holidayBonus/deliveryGuy");
const StaffHolidayBonus = require("../../../../controllers/incentive/bonus/holidayBonus/staff");
const router = express.Router();

router.post("/deliveryguy", DeliveryGuyHolidayBonus);
router.post("/staff", StaffHolidayBonus);

module.exports = router;
