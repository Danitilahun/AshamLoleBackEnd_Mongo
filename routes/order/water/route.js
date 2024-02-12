const express = require("express");
const createCustomerAndWater = require("../../../controllers/order/Water/create");
const deleteWaterAndUpdateCustomer = require("../../../controllers/order/Water/delete");
const editCustomerAndWater = require("../../../controllers/order/Water/update");
const getAllWaterByDateAndBranch = require("../../../controllers/order/Water/get");
const getAllWaterByDateAndCallcenter = require("../../../controllers/order/Water/getAllWaterByDateAndCallcenter");
const router = express.Router();

router.get("/", getAllWaterByDateAndBranch);
router.get("/callcenter", getAllWaterByDateAndCallcenter);

router.post("/", createCustomerAndWater);

router.put("/:id", editCustomerAndWater);

router.delete("/:id", deleteWaterAndUpdateCustomer);

module.exports = router;
