const express = require("express");
const createEssentials = require("../../controllers/essentials/create");
const deleteEssentials = require("../../controllers/essentials/delete");
const editEssentials = require("../../controllers/essentials/edit");
const getAllEssentials = require("../../controllers/essentials/get");
const router = express.Router();

const searchEssentials = require("../../controllers/essentials/searchEssentials");
router.get("/search", searchEssentials);
router.get("/", getAllEssentials);
router.post("/", createEssentials);
router.put("/:id", editEssentials);
router.delete("/:id", deleteEssentials);

module.exports = router;
