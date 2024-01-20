const CallCenter = require("../../../models/user/callCenterSchema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");
const updateEssentialFields = require("../../../services/users/updateEssentialFields");

// Edit an existing call center employee
const editCallCenterEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const data = req.body;

    const updatedCallCenterEmployee = await CallCenter.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ).session(session);

    await updateEssentialFields(
      updatedCallCenterEmployee.essentialId,
      {
        name: updatedCallCenterEmployee.fullName,
        address: updatedCallCenterEmployee.fullAddress,
        phone: updatedCallCenterEmployee.phone,
      },
      session
    );

    await updateAshamStaffByWorkerId(
      id,
      {
        name: updatedCallCenterEmployee.fullName,
      },
      session
    );

    if (!updatedCallCenterEmployee) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Call center employee not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedCallCenterEmployee);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCallCenterEmployee;
