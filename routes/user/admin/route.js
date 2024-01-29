const express = require("express");
const createAdmin = require("../../../controllers/users/admin/create");
const editAdmin = require("../../../controllers/users/admin/edit");
const deleteAdmin = require("../../../controllers/users/admin/delete");
const getAllAdmin = require("../../../controllers/users/admin/get");
const checkDuplicateEmail = require("../../../middlewares/checkDuplicateEmail");
const checkDuplicateEmailExceptCurrent = require("../../../middlewares/checkDuplicateEmailExceptCurrent");

const router = express.Router();

router.get("/", getAllAdmin);
router.post("/", checkDuplicateEmail, createAdmin);
router.put("/:id", checkDuplicateEmailExceptCurrent, editAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
