const { default: mongoose } = require("mongoose");
const Finance = require("../../../models/user/financeschema");
const updateAshamStaffByWorkerId = require("../../../services/users/updateAshamStaffByWorkerId");
const updateEssentialFields = require("../../../services/users/updateEssentialFields");
const { getIoInstance } = require("../../../socket");

// Edit an existing finance entry
const editFinanceEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const io = getIoInstance();

  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    const updatedFinanceEntry = await Finance.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).session(session);

    if (!updatedFinanceEntry) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Finance entry not found" });
    }

    await updateEssentialFields(
      updatedFinanceEntry.essentialId,
      {
        name: updatedFinanceEntry.fullName,
        address: updatedFinanceEntry.fullAddress,
        phone: updatedFinanceEntry.phone,
      },
      session
    );

    await updateAshamStaffByWorkerId(
      id,
      {
        name: updatedFinanceEntry.fullName,
      },
      session
    );

    console.log(updatedFinanceEntry);
    io.emit("financeUpdated", updatedFinanceEntry);
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Finance entry updated successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = editFinanceEntry;
