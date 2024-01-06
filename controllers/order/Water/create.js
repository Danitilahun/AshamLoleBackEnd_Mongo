const mongoose = require("mongoose");
const Customer = require("../../../models/customerSchema");
const Water = require("../../../models/service/waterSchema");

const createCustomerAndWater = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;

    const newWater = new Water(req.body); // Create a new Water object instead of Asbeza

    const newCustomer = new Customer({
      Water: "YES",
      blockHouse,
      branchId,
      branchName,
      blockHouse,
      name,
      phone,
      orderId: newWater._id,
    });

    await newWater.save({ session });
    await newCustomer.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Water created successfully",
      newWater,
      newCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCustomerAndWater;
