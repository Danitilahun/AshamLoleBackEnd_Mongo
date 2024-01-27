const Staff = require("../../../models/staffSchema");
const { getIoInstance } = require("../../../socket");

// Edit an existing staff member
const editStaffMember = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const updatedStaffMember = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    }).session(session);

    if (!updatedStaffMember) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Staff member not found" });
    }

    console.log(updatedStaffMember);
    io.emit("staffMemberUpdated", updatedStaffMember);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedStaffMember);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editStaffMember;
