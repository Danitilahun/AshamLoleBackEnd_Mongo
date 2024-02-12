const CardFee = require("../../../models/report/cardFeeSchema");

const recordReturnCard = async (req, res) => {
  try {
    const { id: cardFeeId } = req.params;
    const { returnCardNumber, reason } = req.body;

    console.log("cardFeeId:", cardFeeId);
    console.log("returnCardNumber:", returnCardNumber);
    console.log("reason:", reason);
    if (!cardFeeId || !returnCardNumber || !reason) {
      throw new Error("cardFeeId, returnCardNumber and reason are required");
    }

    // Update the numberOfCardReturned and reason fields for the given cardFeeId
    const updatedCardFee = await CardFee.findByIdAndUpdate(
      cardFeeId,
      { $set: { returnCardNumber: returnCardNumber, reason: reason } },
      { new: true }
    );

    if (!updatedCardFee) {
      return res.status(404).json({ error: "CardFee document not found" });
    }

    res
      .status(200)
      .json({ message: "Card details updated successfully", updatedCardFee });
  } catch (error) {
    console.error(`Error updating card details:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = recordReturnCard;
