const express = require("express");
const createCustomerAndCard = require("../../../controllers/order/Card/create");
const editCustomerAndCard = require("../../../controllers/order/Card/update");
const deleteCardAndUpdateCustomer = require("../../../controllers/order/Card/delete");
const getAllCardByDateAndBranch = require("../../../controllers/order/Card/get");
const getCardsByDayRemain = require("../../../controllers/order/Card/getCardsByDayRemain");
const getAllCardByDateAndCallcenter = require("../../../controllers/order/Card/getAllCardByDateAndCallcenter");
const router = express.Router();

router.get("/", getAllCardByDateAndBranch);
router.get("/callcenter", getAllCardByDateAndCallcenter);
router.get("/dayRemain", getCardsByDayRemain);
router.post("/", createCustomerAndCard);

router.put("/:id", editCustomerAndCard);

router.delete("/:id", deleteCardAndUpdateCustomer);

module.exports = router;
