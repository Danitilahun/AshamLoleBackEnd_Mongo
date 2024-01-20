const mongoose = require("mongoose");
const Finance = require("../../../models/user/financeschema");

// Create a new finance entry
const createFinanceEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newFinanceEntry = new Finance(data);

    const savedFinanceEntry = await newFinanceEntry.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedFinanceEntry);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createFinanceEntry;
