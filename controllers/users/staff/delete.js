const Staff = require("../../../models/staffSchema");

// Delete a staff member
const deleteStaffMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedStaffMember = await Staff.findByIdAndDelete(id).session(
      session
    );

    if (!deletedStaffMember) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Staff member not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteStaffMember;
