const mongoose = require("mongoose");
const Wifi = require("../../../models/service/wifiSchema");
const Customer = require("../../../models/customerSchema");

const editCustomerAndWifi = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    const wifiId = req.params.wifiId; // Get Wifi ID from URL parameters

    // Find Customer by orderId (wifiId)
    const customer = await Customer.findOne({ orderId: wifiId }).session(
      session
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Update Wifi
    const updatedWifi = await Wifi.findByIdAndUpdate(wifiId, req.body, {
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
      message: "Wifi and Customer updated successfully",
      updatedWifi,
      updatedCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editCustomerAndWifi;
