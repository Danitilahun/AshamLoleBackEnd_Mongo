const mongoose = require("mongoose");
const { DailyCredit } = require("../../../models/credit/dailyCreditSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const updateCredit = require("../../../services/creditRelated/updateCredit");

/**
 * Create a credit document and perform related operations.
 * @param {Object} req - Express.js request object containing the credit data in the body.
 * @param {Object} res - Express.js response object.
 * @returns {Object} JSON response indicating success or failure.
 */

const createCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    // Create a new credit document
    const dailyCredit = new DailyCredit({
      sheetId: data.sheetId,
      amount: parseFloat(data.amount),
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: data.reason,
      source: "Credit",
    });

    await dailyCredit.save();

    // Update the delivery guy's document
    await updateDailyCredit(
      data.deliveryguyId,
      parseInt(data.amount ? data.amount : 0),
      session
    );

    // Update the daily credit total document
    await updateCredit(
      data.branchId,
      "dailyCredit",
      parseFloat(data.amount ? data.amount : 0),
      session
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: `DailyCredit Created successfully.` });
  } catch (error) {
    console.error(error);
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = createCredit;
