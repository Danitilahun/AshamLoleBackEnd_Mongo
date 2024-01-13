const Card = require("../models/cardSchema");
const CompanyGain = require("../models/companyGainSchema");

const updateCardDetails = async (branchId, session) => {
  try {
    // Find and delete cards with dayRemain less than or equal to 0
    await Card.deleteMany({ branchId, dayRemain: { $lte: 0 } }, { session });

    // Get all remaining cards with the given branchId
    const cards = await Card.find({ branchId });

    // Fetch company gain details
    const companyGain = await CompanyGain.findOne();

    for (const card of cards) {
      // Update fields based on the provided logic
      const remainMoney = card.remaingMoney - companyGain.card_price;
      const dayRemain = parseInt(remainMoney / companyGain.card_price);

      // Update the card fields
      await Card.findByIdAndUpdate(
        card._id,
        {
          branchId, // Update with the new branchId
          dayRemain,
          remaingMoney: remainMoney,
        },
        { session }
      );
    }

    return { message: "Card details updated successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = updateCardDetails;
