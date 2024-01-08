const mongoose = require("mongoose");
const WaterDistribute = require("../models/WaterDistribute"); // Update the path to your WaterDistribute model
const DailyCredit = require("../models/DailyCredit"); // Update the path to your DailyCredit model

const createWaterDistributeAndDailyCredit = async (req, res) => {
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

    // Create WaterDistribute document
    const waterDistribute = new WaterDistribute({
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
    await waterDistribute.save({ session });
    await dailyCredit.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({
        message: "WaterDistribute and DailyCredit created successfully",
      });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating WaterDistribute and DailyCredit:", error);
    res
      .status(500)
      .json({ error: "Error creating WaterDistribute and DailyCredit" });
  }
};

module.exports = createWaterDistributeAndDailyCredit;
