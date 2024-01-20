const mongoose = require("mongoose");
const CallCenter = require("../../../models/user/callCenterSchema");

// Create a new call center employee
const createCallCenterEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newCallCenterEmployee = new CallCenter(data);

    const savedCallCenterEmployee = await newCallCenterEmployee.save({
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedCallCenterEmployee);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCallCenterEmployee;
