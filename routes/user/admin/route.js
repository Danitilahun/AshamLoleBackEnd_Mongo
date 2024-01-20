const express = require("express");
const createAdmin = require("../../../controllers/users/admin/create");
const editAdmin = require("../../../controllers/users/admin/edit");
const deleteAdmin = require("../../../controllers/users/admin/delete");
const getAllAdmin = require("../../../controllers/users/admin/get");

const router = express.Router();

router.get("/", getAllAdmin);
router.post("/", createAdmin);
router.put("/:id", editAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
