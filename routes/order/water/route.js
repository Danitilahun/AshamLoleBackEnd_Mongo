const express = require("express");
const createCustomerAndWater = require("../../../controllers/order/Water/create");
const deleteWaterAndUpdateCustomer = require("../../../controllers/order/Water/delete");
const editCustomerAndWater = require("../../../controllers/order/Water/update");
const getAllWaterByDate = require("../../../controllers/order/Water/get");
const router = express.Router();

router.get("/", getAllWaterByDate);

router.post("/", createCustomerAndWater);

router.put("/:id", editCustomerAndWater);

router.delete("/:id", deleteWaterAndUpdateCustomer);

module.exports = router;
