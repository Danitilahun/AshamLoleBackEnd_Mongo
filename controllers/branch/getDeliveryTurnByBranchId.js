const DeliveryTurn = require("../../models/branchRelatedSchema/deliveryTurnSchema");

async function getDeliveryTurnByBranchId(req, res) {
  const { branchId } = req.params; // Assuming branchId is passed as a route parameter

  try {
    const deliveryTurn = await DeliveryTurn.findOne({ branchId }).exec();
    if (!deliveryTurn) {
      return res
        .status(404)
        .json({ error: "Delivery turn not found for the specified branch id" });
    }
    return res.status(200).json(deliveryTurn.deliveryGuyTurnQueue);
  } catch (error) {
    // Handle errors, e.g., log or send an error response
    console.error("Error fetching delivery turn:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getDeliveryTurnByBranchId;
