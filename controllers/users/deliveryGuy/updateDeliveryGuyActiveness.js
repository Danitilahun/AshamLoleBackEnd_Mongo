const Deliveryguy = require("../../../models/deliveryguySchema");

const updateDeliveryGuyActiveness = async (req, res) => {
  try {
    const { activeness, deliveryGuyId } = req.body;

    if (activeness === undefined || deliveryGuyId === undefined) {
      return res
        .status(400)
        .json({ error: "Both activeness and deliveryGuyId are required" });
    }

    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      deliveryGuyId,
      { activeness },
      { new: true } // Return the updated document
    );

    if (!updatedDeliveryGuy) {
      return res.status(404).json({ error: "Delivery guy not found" });
    }

    return res.status(200).json(updatedDeliveryGuy);
  } catch (error) {
    return res.status(500).json({
      error: `Error updating delivery guy activeness: ${error.message}`,
    });
  }
};

module.exports = updateDeliveryGuyActiveness;
