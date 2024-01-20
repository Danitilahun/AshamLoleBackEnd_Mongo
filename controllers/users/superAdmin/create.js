const mongoose = require("mongoose");
const Superadmin = require("../../../models/user/superadminSchema");

// Create a new superadmin
const createSuperadmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newSuperadmin = new Superadmin(data);

    const savedSuperadmin = await newSuperadmin.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedSuperadmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createSuperadmin;
