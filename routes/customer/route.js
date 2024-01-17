const express = require("express");
const {
  getAllCustomers,
} = require("../../controllers/customer/getAllCustomers");
const {
  getCustomersByBranchId,
} = require("../../controllers/customer/getCustomersByBranchId");
const router = express.Router();

router.get("/", getAllCustomers);
router.get("/:id", getCustomersByBranchId);

module.exports = router;
