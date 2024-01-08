const mongoose = require("mongoose");
const WifiDistribute = require("../models/WifiDistribute"); // Update the path to your WifiDistribute model
const DailyCredit = require("../models/DailyCredit"); // Update the path to your DailyCredit model

const createWifiDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      active,
      amount,
      branchId,
      createdAt,
      date,
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

    // Create WifiDistribute document
    const wifiDistribute = new WifiDistribute({
      active,
      amount,
      branchId,
      createdAt,
      date,
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
      createdAt,
      date,
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
    await wifiDistribute.save({ session });
    await dailyCredit.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "WifiDistribute and DailyCredit created successfully" });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating WifiDistribute and DailyCredit:", error);
    res
      .status(500)
      .json({ error: "Error creating WifiDistribute and DailyCredit" });
  }
};

module.exports = createWifiDistributeAndDailyCredit;
