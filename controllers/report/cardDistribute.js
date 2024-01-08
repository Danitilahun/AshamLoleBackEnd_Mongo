const mongoose = require("mongoose");
const CardDistribute = require("../models/CardDistribute"); // Update the path to your CardDistribute model
const DailyCredit = require("../models/DailyCredit"); // Update the path to your DailyCredit model

const createCardDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      active,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      gain,
      numberOfCard,
      price,
      reason,
      returnCardNumber,
      source,
      time,
      total,
    } = req.body;

    // Create CardDistribute document
    const cardDistribute = new CardDistribute({
      active,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      gain,
      numberOfCard,
      price,
      reason,
      returnCardNumber,
      source,
      time,
      total,
    });

    // Create DailyCredit document
    const dailyCredit = new DailyCredit({
      CHECK_SOURCE,
      active,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      gain,
      numberOfCard,
      price,
      reason,
      returnCardNumber,
      source,
      time,
      total,
    });

    // Save both documents within the same transaction
    await cardDistribute.save({ session });
    await dailyCredit.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "CardDistribute and DailyCredit created successfully" });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating CardDistribute and DailyCredit:", error);
    res
      .status(500)
      .json({ error: "Error creating CardDistribute and DailyCredit" });
  }
};

module.exports = createCardDistributeAndDailyCredit;
