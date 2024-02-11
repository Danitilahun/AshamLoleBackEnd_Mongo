const mongoose = require("mongoose");
const Asbeza = require("../../../models/service/asbezaSchema");
const Customer = require("../../../models/customerSchema");

const deleteAsbezaAndUpdateCustomer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: asbezaId } = req.params; // Get Asbeza ID from URL parameters

    // Delete Asbeza
    await Asbeza.findByIdAndDelete(asbezaId).session(session);

    // Update Customer Asbeza field to "No"
    const updatedCustomer = await Customer.findOneAndUpdate(
      { orderId: asbezaId },
      { Asbeza: "No" },
      { new: true, session }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Asbeza deleted and Customer Asbeza status updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteAsbezaAndUpdateCustomer;
