const express = require("express");
const router = express.Router();

const createCustomerAndAsbeza = require("../../../controllers/order/Asbeza/create");
const editCustomerAndAsbeza = require("../../../controllers/order/Asbeza/update");
const deleteAsbezaAndUpdateCustomer = require("../../../controllers/order/Asbeza/delete");
const getAllAsbezaByDateAndBranch = require("../../../controllers/order/Asbeza/get");
const getAllAsbezaByDateAndCallcenter = require("../../../controllers/order/Asbeza/getAllAsbezaByDateAndCallcenter");

router.get("/", getAllAsbezaByDateAndBranch);
router.get("/callcenter", getAllAsbezaByDateAndCallcenter);

router.post("/", createCustomerAndAsbeza);

router.put("/:id", editCustomerAndAsbeza);

router.delete("/:id", deleteAsbezaAndUpdateCustomer);

module.exports = router;
