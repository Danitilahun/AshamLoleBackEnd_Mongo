const mongoose = require("mongoose");
const Deliveryguy = require("../../models/deliveryguySchema");
const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

// Function to shift delivery guy out of and then put them into the delivery turn queue
const shiftDeliveryGuyInAndOutQueue = async (deliveryGuyId, branchId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!deliveryGuyId || !branchId) {
      throw new Error("deliveryGuyId and branchId are required");
    }

    const updatedDeliveryGuy = await Deliveryguy.findById(deliveryGuyId);

    if (!updatedDeliveryGuy) {
      throw new Error("Delivery guy not found");
    }

    const deliveryTurn = await DeliveryTurn.findOne({ branchId }).session(
      session
    );

    if (!deliveryTurn) {
      throw new Error("DeliveryTurn not found for the branch");
    }

    // Find the delivery guy in the queue by ID and remove them
    const indexToRemove = deliveryTurn.deliveryGuyTurnQueue.findIndex(
      (item) => item.id === deliveryGuyId
    );

    if (indexToRemove !== -1) {
      deliveryTurn.deliveryGuyTurnQueue.splice(indexToRemove, 1);
    }

    // Push the delivery guy into the end of the queue
    deliveryTurn.deliveryGuyTurnQueue.push({
      id: deliveryGuyId,
      name: updatedDeliveryGuy.fullName,
    });

    // Save the updated delivery turn
    await deliveryTurn.save();

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Delivery guy shifted in and out of the queue successfully",
      deliveryGuy: updatedDeliveryGuy,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(
      `Error shifting delivery guy in and out of the queue: ${error.message}`
    );
  }
};

module.exports = shiftDeliveryGuyInAndOutQueue;
