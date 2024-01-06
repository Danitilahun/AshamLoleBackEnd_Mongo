const mongoose = require("mongoose");
const Wifi = require("../../../models/service/wifiSchema");
const Customer = require("../../../models/customerSchema");

const deleteWifiAndUpdateCustomer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wifiId = req.params.wifiId; // Get Wifi ID from URL parameters

    // Delete Wifi
    await Wifi.findByIdAndDelete(wifiId).session(session);

    // Update Customer Wifi field to "No"
    const updatedCustomer = await Customer.findOneAndUpdate(
      { orderId: wifiId },
      { Wifi: "No" },
      { new: true, session }
    );

    if (!updatedCustomer) {
      throw new Error("Customer not found");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Wifi deleted and Customer Wifi status updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteWifiAndUpdateCustomer;
