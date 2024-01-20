const express = require("express");
const createPenalty = require("../../../controllers/incentive/penality/create");
const deletePenalty = require("../../../controllers/incentive/penality/delete");
const editPenalty = require("../../../controllers/incentive/penality/edit");
const getAllPenaltiesByBranchAndSheet = require("../../../controllers/incentive/penality/getAllPenaltiesByBranchAndSheet");
const router = express.Router();

router.get("/", getAllPenaltiesByBranchAndSheet);
router.post("/", createPenalty);
router.put("/:id", editPenalty);
router.delete("/:id", deletePenalty);
module.exports = router;
