const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

// Function to update information for a delivery guy in the queue based on deliveryGuyId
const updateDeliveryGuyInQueue = async (
  branchId,
  deliveryGuyId,
  updatedInfo,
  session
) => {
  try {
    // Find the delivery turn record for the specified branch within the provided session
    const deliveryTurn = await DeliveryTurn.findOne({ branchId }).session(
      session
    );

    if (!deliveryTurn) {
      console.error(`No delivery turn found for branch ${branchId}.`);
      return;
    }

    // Find the index of the delivery guy in the queue based on deliveryGuyId
    const indexToUpdate = deliveryTurn.deliveryGuyTurnQueue.findIndex(
      (item) => item.deliveryGuyId.toString() === deliveryGuyId
    );

    if (indexToUpdate !== -1) {
      // Update the information for the delivery guy in the queue
      deliveryTurn.deliveryGuyTurnQueue[indexToUpdate] = {
        deliveryGuyId: mongoose.Types.ObjectId(deliveryGuyId),
        ...updatedInfo,
      };

      // Save the updated delivery turn record within the provided session
      await deliveryTurn.save({ session });

      console.log(`Delivery guy information updated in the queue.`);
    } else {
      console.error(
        `No delivery guy found in the queue for DeliveryGuy ID ${deliveryGuyId}.`
      );
    }
  } catch (error) {
    console.error("Error updating delivery guy in the queue:", error.message);
  }
};

module.exports = updateDeliveryGuyInQueue;
