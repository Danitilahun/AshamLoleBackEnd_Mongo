const mongoose = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");
const DeliveryTurn = require("../../../models/branchRelatedSchema/deliveryTurnSchema");

const updateDeliveryGuyActiveness = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { activeness, deliveryGuyId, branchId } = req.body;

    if (
      activeness === undefined ||
      deliveryGuyId === undefined ||
      branchId === undefined
    ) {
      return res
        .status(400)
        .json({
          error: "activeness, deliveryGuyId, and branchId are required",
        });
    }

    const updatedDeliveryGuy = await Deliveryguy.findByIdAndUpdate(
      deliveryGuyId,
      { activeness },
      { new: true, session } // Use the session for the transaction
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
      (item) => item.deliveryGuyId.toString() === deliveryGuyId
    );

    if (indexToRemove !== -1) {
      deliveryTurn.deliveryGuyTurnQueue.splice(indexToRemove, 1);
    }

    if (activeness) {
      // Add the delivery guy to the end of the queue
      deliveryTurn.enqueue(deliveryGuyId, updatedDeliveryGuy.fullName);
    }

    await deliveryTurn.save();

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json(updatedDeliveryGuy);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res
      .status(500)
      .json({
        error: `Error updating delivery guy activeness: ${error.message}`,
      });
  }
};

module.exports = updateDeliveryGuyActiveness;
