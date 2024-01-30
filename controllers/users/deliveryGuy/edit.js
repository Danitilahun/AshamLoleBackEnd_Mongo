const { default: mongoose } = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");
const { getIoInstance } = require("../../../socket");
const updateDeliveryGuyInQueue = require("../../../services/branchRelated/updateDeliveryGuyInQueue");

// Edit an existing delivery guy
const editDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).session(session);

    if (!updatedDeliveryGuy) {
      throw new Error("Delivery guy not found");
    }

    await updateDeliveryGuyInQueue(
      updatedDeliveryGuy.branchId,
      updatedDeliveryGuy._id,
      {
        name: updatedDeliveryGuy.fullName,
      },
      session
    );

    console.log(updatedDeliveryGuy);
    io.emit("deliveryGuyUpdated", updatedDeliveryGuy);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Delivery guy updated successfully",
      deliveryGuy: updatedDeliveryGuy,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editDeliveryGuy;
