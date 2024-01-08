const CardFee = require("../../models/report/cardFeeSchema");

const updateCardDetails = async (cardFeeId, numberOfCardReturned, reason) => {
  try {
    // Update the numberOfCardReturned and reason fields for the given cardFeeId using the provided session
    const updatedCardFee = await CardFee.findByIdAndUpdate(
      cardFeeId,
      { $set: { numberOfCard: numberOfCardReturned, reason: reason } },
      { new: true } // To return the updated document and use the provided session
    );

    if (!updatedCardFee) {
      throw new Error("CardFee document not found for the given cardFeeId.");
    }

    return updatedCardFee;
  } catch (error) {
    console.error(
      `Error updating card details for CardFee ID ${cardFeeId}:`,
      error
    );
    throw error;
  }
};

module.exports = updateCardDetails;
