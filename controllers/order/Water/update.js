const mongoose = require("mongoose");
const Customer = require("../../../models/customerSchema");
const Water = require("../../../models/service/waterSchema"); // Assuming Water schema/model exists

const editCustomerAndWater = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    const waterId = req.params.waterId; // Get Water ID from URL parameters

    // Find Customer by orderId (waterId)
    const customer = await Customer.findOne({ orderId: waterId }).session(
      session
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Update Water
    const updatedWater = await Water.findByIdAndUpdate(waterId, req.body, {
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
      message: "Water and Customer updated successfully",
      updatedWater,
      updatedCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editCustomerAndWater;
