const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

const updateDeliveryGuyNameInTurnQueue = async (
  session,
  deliveryGuyId,
  newName
) => {
  try {
    const deliveryTurn = await DeliveryTurn.findOne({
      "deliveryGuyTurnQueue.deliveryGuyId": deliveryGuyId,
    }).session(session);

    // if (!deliveryTurn) {
    //   throw new Error(
    //     "Delivery turn not found for the specified delivery guy id"
    //   );
    // }

    const queueItem = deliveryTurn.deliveryGuyTurnQueue.find(
      (item) => item.deliveryGuyId.toString() === deliveryGuyId.toString()
    );

    queueItem.name = newName;

    await deliveryTurn.save({ session });

    return { message: "Delivery guy name updated successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = updateDeliveryGuyNameInTurnQueue;
