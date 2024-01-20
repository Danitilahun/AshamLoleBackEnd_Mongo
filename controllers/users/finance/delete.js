const Finance = require("../../../models/user/financeschema");

// Delete a finance entry
const deleteFinanceEntry = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedFinanceEntry = await Finance.findByIdAndDelete(id).session(
      session
    );

    if (!deletedFinanceEntry) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Finance entry not found" });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Finance entry deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteFinanceEntry;
