const DeliveryGuyGain = require("../../../models/price/deliveryGuyGainSchema");

const createDeliveryGuyGain = async (req, res) => {
  try {
    const defaultGain = new DeliveryGuyGain();
    await defaultGain.save();

    res
      .status(201)
      .json({ message: "DeliveryGuyGain created successfully", defaultGain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDeliveryGuyGain };
