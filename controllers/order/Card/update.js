const mongoose = require("mongoose");
const Card = require("../../../models/service/cardSchema");
const Customer = require("../../../models/customerSchema");

const editCustomerAndCard = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    const { id: cardId } = req.params; // Get Card ID from URL parameters

    // Find Customer by orderId (cardId)
    const customer = await Customer.findOne({ orderId: cardId }).session(
      session
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Update Card
    const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, {
      new: true,
      session,
    });

    // Update Customer using the found customerId
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer._id,
      { blockHouse, branchId, branchName, name, phone },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Card and Customer updated successfully",
      updatedCard,
      updatedCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editCustomerAndCard;
