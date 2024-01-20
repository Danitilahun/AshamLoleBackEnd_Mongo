const Admin = require("../../../models/user/adminSchema");
const mongoose = require("mongoose");
const updateBranchManager = require("../../../services/branchRelated/updateBranchManager");

// Create a new admin
const createAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { active, ...data } = req.body;
    data.salary = parseInt(data.salary);
    data.uniqueName = "admin";
    data.role = process.env.ADMIN;
    data.paid = true;
    data.staffCredit = 0;

    const newAdmin = new Admin.create([data], { session });

    await updateBranchManager(
      data.branchId,
      newAdmin._id,
      newAdmin.name,
      session
    );

    const savedAdmin = await newAdmin.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedAdmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
