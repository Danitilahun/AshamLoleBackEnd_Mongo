const Deliveryguy = require("../../../models/deliveryguySchema");

// Create a new delivery guy
const createDeliveryGuy = async (req, res) => {
  try {
    const data = req.body;

    const newDeliveryGuy = new Deliveryguy(data);

    const savedDeliveryGuy = await newDeliveryGuy.save();
    res.status(201).json(savedDeliveryGuy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createDeliveryGuy;
