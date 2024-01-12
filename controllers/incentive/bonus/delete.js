const { startSession } = require("mongoose");
const Bonus = require("../../../models/incentive/bonusSchema");

// Delete a bonus
const deleteBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const deletedBonus = await Bonus.findByIdAndDelete(id).session(session);

    if (!deletedBonus) {
      // Abort the transaction and end the session if bonus not found
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bonus not found" });
    }

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Bonus deleted successfully" });
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBonus;
