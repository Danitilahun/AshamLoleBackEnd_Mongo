const DeliveryGuyGain = require("../../../models/price/deliveryGuyGainSchema");

// Controller function to get the single document
const getDeliveryGuyGain = async (req, res) => {
  try {
    // Find the single document in the collection
    const deliveryGuyGain = await DeliveryGuyGain.findOne();

    if (!deliveryGuyGain) {
      return res
        .status(404)
        .json({ message: "DeliveryGuyGain document not found" });
    }

    // Send the document as the response
    res.status(200).json(deliveryGuyGain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getDeliveryGuyGain;
