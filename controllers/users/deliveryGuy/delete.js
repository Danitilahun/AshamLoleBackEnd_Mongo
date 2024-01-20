const Deliveryguy = require("../../../models/deliveryguySchema");

// Delete a delivery guy
const deleteDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedDeliveryGuy = await Deliveryguy.findByIdAndDelete(id).session(
      session
    );

    if (!deletedDeliveryGuy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Delivery guy not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Delivery guy deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteDeliveryGuy;
