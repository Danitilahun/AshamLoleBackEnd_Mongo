const mongoose = require("mongoose");
const Staff = require("../../../models/staffSchema");

// Create a new staff member
const createStaffMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    const newStaffMember = new Staff(data);

    const savedStaffMember = await newStaffMember.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedStaffMember);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createStaffMember;
