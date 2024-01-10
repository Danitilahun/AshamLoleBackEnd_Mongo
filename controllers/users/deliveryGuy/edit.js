const Deliveryguy = require("../../../models/deliveryguySchema");

// Edit an existing delivery guy
const editDeliveryGuy = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedDeliveryGuy) {
      return res.status(404).json({ message: "Delivery guy not found" });
    }

    res.status(200).json(updatedDeliveryGuy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editDeliveryGuy;
