const mongoose = require("mongoose");
const DeliveryTurn = require("./path-to-your-model/DeliveryTurn"); // Replace with the correct path

// Function to add a delivery guy to the queue
const addDeliveryGuyToQueue = async (branchId, deliveryGuyId, name) => {
  try {
    // Find or create a delivery turn record for the specified branch
    let deliveryTurn = await DeliveryTurn.findOne({ branchId });

    if (!deliveryTurn) {
      deliveryTurn = new DeliveryTurn({ branchId });
    }

    // Enqueue the delivery guy's turn
    deliveryTurn.enqueue(deliveryGuyId, name);

    // Save the updated delivery turn record
    await deliveryTurn.save();

    console.log(
      `Delivery guy ${name} added to the queue for branch ${branchId}.`
    );
  } catch (error) {
    console.error("Error adding delivery guy to the queue:", error.message);
  }
};

module.exports = addDeliveryGuyToQueue;
