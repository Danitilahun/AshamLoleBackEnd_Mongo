const express = require("express");
const createCustomerAndCard = require("../../../controllers/order/Card/create");
const editCustomerAndCard = require("../../../controllers/order/Card/update");
const deleteCardAndUpdateCustomer = require("../../../controllers/order/Card/delete");
const getAllCardByDate = require("../../../controllers/order/Card/get");
const getCardsByDayRemain = require("../../../controllers/order/Card/getCardsByDayRemain");
const router = express.Router();

router.get("/", getAllCardByDate);
router.get("/dayRemain", getCardsByDayRemain);

router.post("/", createCustomerAndCard);

router.put("/:id", editCustomerAndCard);

router.delete("/:id", deleteCardAndUpdateCustomer);

module.exports = router;
