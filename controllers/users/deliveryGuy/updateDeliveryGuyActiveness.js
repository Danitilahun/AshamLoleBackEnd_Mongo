const mongoose = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");
const DeliveryTurn = require("../../../models/branchRelatedSchema/deliveryTurnSchema");

const updateDeliveryGuyActiveness = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: deliveryGuyId } = req.params;
    const { activeness, branchId } = req.body;
    console.log(deliveryGuyId, activeness, branchId);
    if (
      activeness === undefined ||
      deliveryGuyId === undefined ||
      branchId === undefined
    ) {
      return res.status(400).json({
        error: "activeness, deliveryGuyId, and branchId are required",
      });
    }

    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      deliveryGuyId,
      { activeness },
      { new: true, session }
    );

    if (!updatedDeliveryGuy) {
      return res.status(404).json({ error: "Delivery guy not found" });
    }

    const deliveryTurn = await DeliveryTurn.findOne({ branchId }).session(
      session
    );

    if (!deliveryTurn) {
      return res
        .status(404)
        .json({ error: "DeliveryTurn not found for the branch" });
    }

    // Find the delivery guy in the queue by ID and remove them
    const indexToRemove = deliveryTurn.deliveryGuyTurnQueue.findIndex(
      (item) => item.deliveryGuyId === deliveryGuyId
    );

    if (indexToRemove !== -1) {
      deliveryTurn.deliveryGuyTurnQueue.splice(indexToRemove, 1);
    }

    if (activeness) {
      // Push the delivery guy into the end of the queue
      deliveryTurn.deliveryGuyTurnQueue.push({
        id: deliveryGuyId,
        name: updatedDeliveryGuy.fullName,
      });
    }

    await deliveryTurn.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Delivery guy activeness updated successfully",
      deliveryGuy: updatedDeliveryGuy,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error updating delivery guy activeness:", error);
    return res.status(500).json({
      error: `Error updating delivery guy activeness: ${error.message}`,
    });
  }
};

module.exports = updateDeliveryGuyActiveness;
