const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

// Function to add a delivery guy to the queue
const addDeliveryGuyToQueue = async (
  branchId,
  deliveryGuyId,
  name,
  session
) => {
  try {
    // Find or create a delivery turn record for the specified branch within the provided session
    let deliveryTurn = await DeliveryTurn.findOne({ branchId }).session(
      session
    );

    if (!deliveryTurn) {
      deliveryTurn = new DeliveryTurn({ branchId });
    }

    // Enqueue the delivery guy's turn
    deliveryTurn.enqueue(deliveryGuyId, name);

    // Save the updated delivery turn record within the provided session
    await deliveryTurn.save({ session });

    console.log(
      `Delivery guy ${name} added to the queue for branch ${branchId}.`
    );
  } catch (error) {
    console.error("Error adding delivery guy to the queue:", error.message);
  }
};

module.exports = addDeliveryGuyToQueue;
