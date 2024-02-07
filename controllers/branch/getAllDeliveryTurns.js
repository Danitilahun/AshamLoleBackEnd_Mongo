const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

async function getAllDeliveryTurns(req, res) {
  try {
    const allDeliveryTurns = await DeliveryTurn.find().exec();

    // Map delivery turn documents to the desired format
    const formattedDeliveryTurns = allDeliveryTurns.map((turn) => ({
      branchId: turn.branchId,
      deliveryGuyTurnQueue: turn.deliveryGuyTurnQueue,
    }));

    return res.status(200).json(formattedDeliveryTurns);
  } catch (error) {
    // Handle errors, e.g., log or send an error response
    console.error("Error fetching all delivery turns:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getAllDeliveryTurns;
