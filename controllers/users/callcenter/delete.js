const Essential = require("../../../models/essentialSchema");
const CallCenter = require("../../../models/user/callCenterSchema");

// Delete a call center employee
const deleteCallCenterEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedCallCenterEmployee = await CallCenter.findByIdAndDelete(
      id
    ).session(session);

    if (!deletedCallCenterEmployee) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Call center employee not found" });
    }
    await Essential.findByIdAndDelete(
      deletedCallCenterEmployee.essentialId
    ).session(session);

    await deleteAshamStaffByField("id", deletedCallCenterEmployee._id, session);

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Call center employee deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCallCenterEmployee;
