const mongoose = require("mongoose");

const createCustomerAndAsbeza = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      blockHouse,
      branchId,
      branchName,
      name,
      phone,
      additionalInfo,
      branchKey,
      callcenterId,
      callcenterName,
      date,
      deliveryguyId,
      deliveryguyName,
      fromWhere,
      order,
      status,
      updatedAt,
    } = req.body;

    const newAsbeza = new Asbeza(req.body);

    const newCustomer = new Customer({
      Asbeza: "YES",
      blockHouse,
      branchId,
      branchName,
      blockHouse,
      name,
      phone,
    });

    await newAsbeza.save({ session });
    await newCustomer.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Asbeza and Customer created successfully",
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
