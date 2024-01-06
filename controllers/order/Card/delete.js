const mongoose = require("mongoose");
const Card = require("../../../models/service/cardSchema");
const Customer = require("../../../models/customerSchema");

const deleteCardAndUpdateCustomer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cardId = req.params.cardId; // Get Card ID from URL parameters

    // Delete Card
    await Card.findByIdAndDelete(cardId).session(session);

    // Update Customer Card field to "No"
    const updatedCustomer = await Customer.findOneAndUpdate(
      { orderId: cardId },
      { Card: "No" },
      { new: true, session }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Card deleted and Customer Card status updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCardAndUpdateCustomer;
