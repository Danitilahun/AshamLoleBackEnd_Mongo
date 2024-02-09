// Import required modules
const express = require("express");
const createBranch = require("../../controllers/branch/create");
const editBranch = require("../../controllers/branch/edit");
const deleteBranch = require("../../controllers/branch/delete");
const getAllBranches = require("../../controllers/branch/getAllbranches");
const getSingleBranch = require("../../controllers/branch/getSingleBranch");
const getDeliveryTurnByBranchId = require("../../controllers/branch/getDeliveryTurnByBranchId");
const getAllDeliveryTurns = require("../../controllers/branch/getAllDeliveryTurns");
const {
  getCreditByBranchId,
} = require("../../controllers/branch/getCreditByBranchId");
const getCompanyFinancialData = require("../../controllers/branch/getCompanyFinancialData");
const router = express.Router();

router.get("/deliveryTurn/:branchId", getDeliveryTurnByBranchId);
router.get("/:id", getSingleBranch);
router.get("/credit/:branchId", getCreditByBranchId);
router.get("/deliveryTurn", getAllDeliveryTurns);
router.get("/companyData", getCompanyFinancialData);
router.get("/", getAllBranches);
router.post("/", createBranch);
router.put("/:id", editBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
