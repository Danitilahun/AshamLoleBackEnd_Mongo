const mongoose = require("mongoose");
const Wifi = require("../../../models/service/wifiSchema");
const Customer = require("../../../models/customerSchema");
const shiftDeliveryGuyInAndOutQueue = require("../shiftDeliveryGuyInAndOutQueue");

const createCustomerAndWifi = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    console.log("req.body", req.body);
    const newWifi = new Wifi(req.body);

    const newCustomer = new Customer({
      Wifi: "YES",
      blockHouse,
      branchId,
      branchName,
      blockHouse,
      name,
      phone,
      orderId: newWifi._id,
    });

    await newWifi.save({ session });
    await newCustomer.save({ session });
    await shiftDeliveryGuyInAndOutQueue(
      req.body.deliveryguyId,
      req.body.branchId,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Wifi created successfully",
      newWifi,
      newCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCustomerAndWifi;
