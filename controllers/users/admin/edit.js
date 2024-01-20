const mongoose = require("mongoose");
const Admin = require("../../../models/user/adminSchema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");

// Edit an existing admin
const editAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const data = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(id, data, {
      new: true,
      session,
    });

    if (!updatedAdmin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Admin not found" });
    }

    await updateAshamStaffByWorkerId(
      id,
      {
        name: updatedAdmin.fullName,
      },
      session
    );
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedAdmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = editAdmin;
