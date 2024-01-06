const mongoose = require("mongoose");
const Water = require("../../../models/service/waterSchema"); // Import Water schema/model
const Customer = require("../../../models/customerSchema");

const deleteWaterAndUpdateCustomer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const waterId = req.params.waterId; // Get Water ID from URL parameters

    // Delete Water
    await Water.findByIdAndDelete(waterId).session(session);

    // Update Customer Water field to "No"
    const updatedCustomer = await Customer.findOneAndUpdate(
      { orderId: waterId },
      { Water: "No" },
      { new: true, session }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Water deleted and Customer Water status updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteWaterAndUpdateCustomer;
