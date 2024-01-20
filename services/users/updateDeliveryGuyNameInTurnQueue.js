const mongoose = require("mongoose");
const DeliveryTurn = require("path/to/DeliveryTurnModel"); // Update the path accordingly

const updateDeliveryGuyNameInTurnQueue = async (
  session,
  deliveryGuyId,
  newName
) => {
  try {
    const deliveryTurn = await DeliveryTurn.findOne({
      "deliveryGuyTurnQueue.deliveryGuyId": deliveryGuyId,
    }).session(session);

    if (!deliveryTurn) {
      throw new Error(
        "Delivery turn not found for the specified delivery guy id"
      );
    }

    const queueItem = deliveryTurn.deliveryGuyTurnQueue.find(
      (item) => item.deliveryGuyId.toString() === deliveryGuyId.toString()
    );

    if (!queueItem) {
      throw new Error("Delivery guy not found in the turn queue");
    }

    queueItem.name = newName;

    await deliveryTurn.save({ session });

    return { message: "Delivery guy name updated successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = updateDeliveryGuyNameInTurnQueue;
