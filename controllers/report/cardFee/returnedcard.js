const CardFee = require("../../../models/report/cardFeeSchema");

const recordReturnCard = async (req, res) => {
  try {
    const { cardFeeId } = req.params;
    const { numberOfCardReturned, reason } = req.body;

    if (!cardFeeId || !numberOfCardReturned || !reason) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the numberOfCardReturned and reason fields for the given cardFeeId
    const updatedCardFee = await CardFee.findByIdAndUpdate(
      cardFeeId,
      { $set: { numberOfCard: numberOfCardReturned, reason: reason } },
      { new: true } // To return the updated document
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
