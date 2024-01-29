const { default: mongoose } = require("mongoose");
const CallCenter = require("../../../models/user/callCenterSchema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");
const updateEssentialFields = require("../../../services/users/updateEssentialFields");
const { getIoInstance } = require("../../../socket");

// Edit an existing call center employee
const editCallCenterEmployee = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

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
      throw new Error("Call center employee not found");
    }

    console.log(updatedCallCenterEmployee);
    io.emit("callCenterUpdated", updatedCallCenterEmployee);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Call center employee updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCallCenterEmployee;
