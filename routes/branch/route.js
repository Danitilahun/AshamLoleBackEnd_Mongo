// Import required modules
const express = require("express");
const createBranch = require("../../controllers/branch/create");
const editBranch = require("../../controllers/branch/edit");
const deleteBranch = require("../../controllers/branch/delete");
const getSingleBranch = require("../../controllers/branch/getSingleBranch");
const router = express.Router();

router.get("/:id", getSingleBranch);
router.post("/", createBranch);
router.put("/:id", editBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
