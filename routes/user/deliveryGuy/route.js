const express = require("express");
const createDeliveryGuy = require("../../../controllers/users/deliveryGuy/create");
const editDeliveryGuy = require("../../../controllers/users/deliveryGuy/edit");
const deleteDeliveryGuy = require("../../../controllers/users/deliveryGuy/delete");
const getDeliveryguyById = require("../../../controllers/users/deliveryGuy/get");
const handlePayController = require("../../../controllers/users/deliveryGuy/handlePayController");
const updateDeliveryGuyActiveness = require("../../../controllers/users/deliveryGuy/updateDeliveryGuyActiveness");
const completeTask = require("../../../controllers/users/deliveryGuy/CompleteTask");
const getDeliveryGuysByBranchId = require("../../../controllers/users/deliveryGuy/getDeliveryGuysByBranchId");

const router = express.Router();

router.get("/list/:branchId", getDeliveryGuysByBranchId);
router.get("/", getDeliveryguyById);
router.post("/", createDeliveryGuy);
router.post("/complete", completeTask);
router.put("/:id", editDeliveryGuy);
router.put("/pay/:id", handlePayController);
router.put("/activeness/:id", updateDeliveryGuyActiveness);
router.delete("/:id", deleteDeliveryGuy);

module.exports = router;
