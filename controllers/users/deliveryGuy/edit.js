const Deliveryguy = require("../../../models/deliveryguySchema");

// Edit an existing delivery guy
const editDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).session(session);

    if (!updatedDeliveryGuy) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Delivery guy not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedDeliveryGuy);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editDeliveryGuy;
