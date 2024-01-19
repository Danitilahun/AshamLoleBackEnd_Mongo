const express = require("express");
const createCustomerAndWifi = require("../../../controllers/order/Wifi/create");
const editCustomerAndWifi = require("../../../controllers/order/Wifi/update");
const getAllWifiByDate = require("../../../controllers/order/Wifi/get");
const deleteWifiAndUpdateCustomer = require("../../../controllers/order/Wifi/delete");
const router = express.Router();

router.get("/", getAllWifiByDate);

router.post("/", createCustomerAndWifi);

router.put("/:id", editCustomerAndWifi);

router.delete("/:id", deleteWifiAndUpdateCustomer);

module.exports = router;