const mongoose = require("mongoose");
const Asbeza = require("../../../models/service/asbezaSchema");
const Customer = require("../../../models/customerSchema");

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

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Asbeza created successfully",
      newAsbeza,
      newCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCustomerAndAsbeza;
