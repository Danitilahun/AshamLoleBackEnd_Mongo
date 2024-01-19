const express = require("express");
const router = express.Router();

const createCustomerAndAsbeza = require("../../../controllers/order/Asbeza/create");
const editCustomerAndAsbeza = require("../../../controllers/order/Asbeza/update");
const deleteAsbezaAndUpdateCustomer = require("../../../controllers/order/Asbeza/delete");
const getAllAsbezaByDate = require("../../../controllers/order/Asbeza/get");

router.get("/", getAllAsbezaByDate);

router.post("/", createCustomerAndAsbeza);

router.put("/:id", editCustomerAndAsbeza);

router.delete("/:id", deleteAsbezaAndUpdateCustomer);

module.exports = router;
