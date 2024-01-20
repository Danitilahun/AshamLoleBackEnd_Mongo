const mongoose = require("mongoose");
const Deliveryguy = require("../../../models/deliveryguySchema");

// Create a new delivery guy
const createDeliveryGuy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newDeliveryGuy = new Deliveryguy(data);

    const savedDeliveryGuy = await newDeliveryGuy.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedDeliveryGuy);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createDeliveryGuy;
