const mongoose = require("mongoose");
const DailyCredit = require("../../../models/credit/dailyCreditSchema");

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
    if (!data || !data.deliveryguyId) {
      return res.status(400).json({
        message:
          "Request body is missing or empty. Please refresh your browser and try again.",
      });
    }

    // Create a new credit document
    const dailyCredit = new DailyCredit({
      uniqueDailyCreditId: generateCustomID("Cred1t_Reason_987X1_normalcredit"),
      sheetId: data.sheetId,
      amount: parseFloat(data.amount),
      branchId: data.branchId,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      gain: parseFloat(data.amount),
      numberOfCard: data.numberOfCard,
      price: parseFloat(data.price),
      reason: data.reason,
      source: "Credit",
      total: parseFloat(data.amount),
    });

    await dailyCredit.save();

    // Update the delivery guy's document
    await updateDeliveryGuy(
      data.deliveryguyId,
      "dailyCredit",
      parseInt(data.amount ? data.amount : 0)
    );

    // Update the daily credit total document
    const dailyCreditTotalId = generateCustomID(`${data.branchId}-daily`);
    await updateCreditDocument(
      dailyCreditTotalId,
      "dailyCreditTotal",
      parseFloat(data.amount ? data.amount : 0)
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
