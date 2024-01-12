const { startSession } = require("mongoose");
const Bonus = require("../../../models/incentive/bonusSchema");

// Create a new bonus
const createBonus = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const data = req.body;

    // Create a new bonus document within the session
    const newBonus = new Bonus(data);
    const savedBonus = await newBonus.save({ session });

    // Commit the transaction if successful
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedBonus);
  } catch (error) {
    // Abort the transaction and end the session in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createBonus;
