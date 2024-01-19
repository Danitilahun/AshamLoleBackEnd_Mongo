const express = require("express");
const createSheet = require("../../controllers/sheet/create");
const deleteSheet = require("../../controllers/sheet/delete");
const ChangeSheetStatus = require("../../controllers/sheet/completeSheet");
const getAllSheetsByBranchId = require("../../controllers/sheet/get/getAllSheetsByBranchId");
const getDeliveryGuySalaryDetails = require("../../controllers/sheet/get/getDeliveryGuySalaryDetails");
const getDeliveryGuyWorkSummary = require("../../controllers/sheet/get/getDeliveryGuyWorkSummary");
const getFifteenDayWorkSummary = require("../../controllers/sheet/get/getFifteenDayWorkSummary");
const getStaffSalaryDetails = require("../../controllers/sheet/get/getStaffSalaryDetails");
const router = express.Router();

router.get("staffSalary", getStaffSalaryDetails);
router.get("daySummary", getFifteenDayWorkSummary);
router.get("/deliveryGuySummary", getDeliveryGuyWorkSummary);
router.get("/deliveryGuySalary", getDeliveryGuySalaryDetails);
router.get("/sheet", getAllSheetsByBranchId);
router.post("/", createSheet);
router.post("/changeStatus", ChangeSheetStatus);
router.delete("/:id", deleteSheet);
module.exports = router;
