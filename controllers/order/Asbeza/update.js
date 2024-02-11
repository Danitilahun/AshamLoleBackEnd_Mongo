const mongoose = require("mongoose");
const Customer = require("../../../models/customerSchema");
const Asbeza = require("../../../models/service/asbezaSchema");

const editCustomerAndAsbeza = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    const { id: asbezaId } = req.params; // Get Asbeza ID from URL parameters

    // Find Customer by orderId (asbezaId)
    const customer = await Customer.findOne({ orderId: asbezaId }).session(
      session
    );

    // Update Asbeza
    const updatedAsbeza = await Asbeza.findByIdAndUpdate(asbezaId, req.body, {
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
      message: "Asbeza and Customer updated successfully",
      updatedAsbeza,
      updatedCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCustomerAndAsbeza;
