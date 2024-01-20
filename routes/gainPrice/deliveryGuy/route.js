const express = require("express");
const {
  createDeliveryGuyGain,
} = require("../../../controllers/gainPrice/DeliveryGuy/create");
const {
  updateDeliveryGuyGainField,
} = require("../../../controllers/gainPrice/DeliveryGuy/update");
const getDeliveryGuyGain = require("../../../controllers/gainPrice/DeliveryGuy/getDeliveryGuyGain");
const router = express.Router();

router.get("/", getDeliveryGuyGain);
router.post("/", createDeliveryGuyGain);
router.put("/:id", updateDeliveryGuyGainField);

module.exports = router;
