const express = require("express");
const createCallCenterEmployee = require("../../../controllers/users/callcenter/create");
const editCallCenterEmployee = require("../../../controllers/users/callcenter/edit");
const getAllCallCenter = require("../../../controllers/users/callcenter/get");
const checkDuplicateEmail = require("../../../middlewares/checkDuplicateEmail");
const checkDuplicateEmailExceptCurrent = require("../../../middlewares/checkDuplicateEmailExceptCurrent");

const router = express.Router();

router.get("/", getAllCallCenter);
router.post("/", checkDuplicateEmail, createCallCenterEmployee);
router.put("/:id", checkDuplicateEmailExceptCurrent, editCallCenterEmployee);

module.exports = router;
