const Superadmin = require("../../../models/user/superadminSchema");

// Edit an existing superadmin
const editSuperadmin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updatedSuperadmin = await Superadmin.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).session(session);

    if (!updatedSuperadmin) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Superadmin not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedSuperadmin);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editSuperadmin;
