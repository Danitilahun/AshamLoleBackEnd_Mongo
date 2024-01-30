const { default: mongoose } = require("mongoose");
const Staff = require("../../../models/staffSchema");
const increaseNumberOfWorker = require("../../../services/branchRelated/increaseNumberOfWorker");
const { getIoInstance } = require("../../../socket");

// Delete a staff member
const deleteStaffMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

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
    await increaseNumberOfWorker(deletedStaffMember.branchId, session, -1);

    console.log(deletedStaffMember);
    io.emit("staffDeleted", id);
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
