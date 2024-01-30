const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

// Function to remove a delivery guy from the queue based on deliveryGuyId
const removeDeliveryGuyByIdFromQueue = async (
  branchId,
  deliveryGuyId,
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
    const indexToRemove = deliveryTurn.deliveryGuyTurnQueue.findIndex(
      (item) => item.deliveryGuyId.toString() === deliveryGuyId
    );

    if (indexToRemove !== -1) {
      // Remove the delivery guy from the queue
      const removedDeliveryGuy = deliveryTurn.deliveryGuyTurnQueue.splice(
        indexToRemove,
        1
      )[0];

      // Save the updated delivery turn record within the provided session
      await deliveryTurn.save({ session });

      console.log(
        `Delivery guy ${removedDeliveryGuy.name} removed from the queue.`
      );
    } else {
      console.error(
        `No delivery guy found in the queue for DeliveryGuy ID ${deliveryGuyId}.`
      );
    }
  } catch (error) {
    console.error("Error removing delivery guy from the queue:", error.message);
  }
};

module.exports = removeDeliveryGuyByIdFromQueue;
