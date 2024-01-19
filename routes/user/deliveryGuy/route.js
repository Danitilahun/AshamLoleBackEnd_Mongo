const express = require("express");
const createDeliveryGuy = require("../../../controllers/users/deliveryGuy/create");
const editDeliveryGuy = require("../../../controllers/users/deliveryGuy/edit");
const deleteDeliveryGuy = require("../../../controllers/users/deliveryGuy/delete");
const getDeliveryguyById = require("../../../controllers/users/deliveryGuy/get");
const handlePayController = require("../../../controllers/users/deliveryGuy/handlePayController");
const updateDeliveryGuyActiveness = require("../../../controllers/users/deliveryGuy/updateDeliveryGuyActiveness");
const completeTask = require("../../../controllers/users/deliveryGuy/CompleteTask");

const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getDeliveryguyById);
// Create a new expense
router.post("/", createDeliveryGuy);
router.post("/complete", completeTask);
// Update an existing expense
router.put("/:id", editDeliveryGuy);
router.put("/pay/:id", handlePayController);
router.put("/activeness/:id", updateDeliveryGuyActiveness);
// Delete an expense
router.delete("/:id", deleteDeliveryGuy);

module.exports = router;
