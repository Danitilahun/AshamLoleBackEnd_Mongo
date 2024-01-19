const express = require("express");
const {
  createDeliveryGuyGain,
} = require("../../../controllers/gainPrice/DeliveryGuy/create");
const {
  updateDeliveryGuyGainField,
} = require("../../../controllers/gainPrice/DeliveryGuy/update");
const getDeliveryGuyGain = require("../../../controllers/gainPrice/DeliveryGuy/getDeliveryGuyGain");
const router = express.Router();

// Define the route for creating data for an admin
// Get all expenses
router.get("/", getDeliveryGuyGain);

// Create a new expense
router.post("/", createDeliveryGuyGain);

// Update an existing expense
router.put("/:id", updateDeliveryGuyGainField);

module.exports = router;
