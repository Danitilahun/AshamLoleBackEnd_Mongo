const express = require("express");
const createCallCenterEmployee = require("../../../controllers/users/callcenter/create");
const editCallCenterEmployee = require("../../../controllers/users/callcenter/edit");
const getAllCallCenter = require("../../../controllers/users/callcenter/get");

const router = express.Router();

router.get("/", getAllCallCenter);
router.post("/", createCallCenterEmployee);
router.put("/:id", editCallCenterEmployee);

module.exports = router;
