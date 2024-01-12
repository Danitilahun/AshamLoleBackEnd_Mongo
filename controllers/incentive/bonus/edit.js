const Bonus = require("../../../models/incentive/bonusSchema");
const { startSession } = require("mongoose");

// Edit an existing bonus
const editBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const data = req.body;
    // Find the existing bonus document by ID
    const existingBonus = await Bonus.findById(id).session(session);

    if (!existingBonus) {
      throw new Error("Bonus not found for the given ID");
    }

    Object.assign(existingBonus, data);
    const updatedBonus = await existingBonus.save({ session });

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedBonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = editBonus;
