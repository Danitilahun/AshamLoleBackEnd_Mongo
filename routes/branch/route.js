// Import required modules
const express = require("express");
const createBranch = require("../../controllers/branch/create");
const editBranch = require("../../controllers/branch/edit");
const deleteBranch = require("../../controllers/branch/delete");
const getAllBranches = require("../../controllers/branch/getAllbranches");
const getSingleBranch = require("../../controllers/branch/getSingleBranch");
const router = express.Router();

// Define the route for creating data for an admin
router.get("/", getAllBranches);
router.get("/:id", getSingleBranch);
router.post("/", createBranch);
router.put("/:id", editBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
