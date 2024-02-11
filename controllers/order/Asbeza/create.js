const mongoose = require("mongoose");
const Asbeza = require("../../../models/service/asbezaSchema");
const Customer = require("../../../models/customerSchema");
const shiftDeliveryGuyInAndOutQueue = require("../shiftDeliveryGuyInAndOutQueue");

const createCustomerAndAsbeza = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;

    const newAsbeza = new Asbeza(req.body);

    const newCustomer = new Customer({
      Asbeza: "YES",
      blockHouse,
      branchId,
      branchName,
      blockHouse,
      name,
      phone,
      orderId: newAsbeza._id,
    });

    await newAsbeza.save({ session });
    await newCustomer.save({ session });
    await shiftDeliveryGuyInAndOutQueue(
      req.body.deliveryguyId,
      req.body.branchId,
      session
    );
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Asbeza created successfully",
      data: newAsbeza,
      newCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = createCustomerAndAsbeza;
