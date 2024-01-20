const express = require("express");
const createBonus = require("../../../controllers/incentive/bonus/create");
const deleteBonus = require("../../../controllers/incentive/bonus/delete");
const editBonus = require("../../../controllers/incentive/bonus/edit");
const getAllBonusesByBranchAndSheet = require("../../../controllers/incentive/bonus/getAllBonusesByBranchAndSheet");
const router = express.Router();

const createHolidayBonus = require("./holiday/route");

router.get("/", getAllBonusesByBranchAndSheet);

router.post("/", createBonus);
router.post("holiday", createHolidayBonus);
router.put("/:id", editBonus);
router.delete("/:id", deleteBonus);
module.exports = router;
