const shiftDeliveryGuyInAndOutQueue = async (
  deliveryGuyId,
  branchId,
  session
) => {
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

    // Save the updated delivery turn within the provided session
    await deliveryTurn.save({ session });

    return {
      message: "Delivery guy shifted in and out of the queue successfully",
      deliveryGuy: updatedDeliveryGuy,
    };
  } catch (error) {
    throw new Error(
      `Error shifting delivery guy in and out of the queue: ${error.message}`
    );
  }
};

module.exports = shiftDeliveryGuyInAndOutQueue;
