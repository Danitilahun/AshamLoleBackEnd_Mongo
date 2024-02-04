const express = require("express");
const router = express.Router();

const adminRoute = require("./admin/route");
const callCenterRoute = require("./callCenter/route");
const financeRoute = require("./finance/route");
const deliveryGuyRoute = require("./deliveryGuy/route");
const superAdminRoute = require("./superAdmin/route");
const staffRoute = require("./staff/route");
const verifyRoles = require("../../middlewares/verifyRoles");
const checkDuplicateEmail = require("../../middlewares/checkDuplicateEmail");
const getEmployeesByBranchId = require("../../controllers/users/getEmployeesByBranchId");

router.get(
  "/employees/:branchId",
  verifyRoles(process.env.ADMIN),
  getEmployeesByBranchId
);
router.use("/deliveryGuy", verifyRoles(process.env.ADMIN), deliveryGuyRoute);
router.use("/admin", verifyRoles(process.env.SUPERADMIN), adminRoute);
router.use("/callCenter", verifyRoles(process.env.SUPERADMIN), callCenterRoute);
router.use("/finance", financeRoute);
router.use("/superAdmin", superAdminRoute);
router.use("/staff", staffRoute);

module.exports = router;
