const express = require("express");
const router = express.Router();

const adminRoute = require("./admin/route");
const callCenterRoute = require("./callCenter/route");
const financeRoute = require("./finance/route");
const deliveryGuyRoute = require("./deliveryGuy/route");
const superAdminRoute = require("./superAdmin/route");
const staffRoute = require("./staff/route");
const verifyRoles = require("../../middlewares/verifyRoles");

router.use("/admin", verifyRoles(process.env.SUPERADMIN), adminRoute);
router.use("/callCenter", callCenterRoute);
router.use("/finance", financeRoute);
router.use("/deliveryGuy", deliveryGuyRoute);
router.use("/superAdmin", superAdminRoute);
router.use("/staff", staffRoute);

module.exports = router;
