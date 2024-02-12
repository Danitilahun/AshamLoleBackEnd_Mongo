const express = require("express");
const createCustomerAndWifi = require("../../../controllers/order/Wifi/create");
const editCustomerAndWifi = require("../../../controllers/order/Wifi/update");
const getAllWifiByDateAndBranch = require("../../../controllers/order/Wifi/get");
const deleteWifiAndUpdateCustomer = require("../../../controllers/order/Wifi/delete");
const getAllWifiByDateAndCallcenter = require("../../../controllers/order/Wifi/getAllWifiByDateAndCallcenter");
const router = express.Router();

router.get("/", getAllWifiByDateAndBranch);
router.get("/callcenter", getAllWifiByDateAndCallcenter);
router.post("/", createCustomerAndWifi);
router.put("/:id", editCustomerAndWifi);
router.delete("/:id", deleteWifiAndUpdateCustomer);
module.exports = router;
