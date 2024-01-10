const Deliveryguy = require("../../../models/deliveryguySchema");

// Delete a delivery guy
const deleteDeliveryGuy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDeliveryGuy = await Deliveryguy.findByIdAndDelete(id);

    if (!deletedDeliveryGuy) {
      return res.status(404).json({ message: "Delivery guy not found" });
    }

    res.status(200).json({ message: "Delivery guy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteDeliveryGuy;
