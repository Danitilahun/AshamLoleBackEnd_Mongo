const mongoose = require("mongoose");
const { DailyCredit } = require("../../../models/credit/dailyCreditSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const updateCredit = require("../../../services/creditRelated/updateCredit");

/**
 * Update a credit document and perform related operations.
 * @param {Object} req - Express.js request object containing the updated credit data in the body.
 * @param {Object} res - Express.js response object.
 * @returns {Object} JSON response indicating success or failure.
 */
const editCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const { creditId } = req.params;
    // Fetch the existing credit document
    const existingCredit = await DailyCredit.findById(creditId);

    if (!existingCredit) {
      return res.status(404).json({ message: "Credit document not found." });
    }

    await DailyCredit.findByIdAndUpdate(creditId, data, { session });
    // Update the delivery guy's document
    await updateDailyCredit(
      existingCredit.deliveryguyId,
      data.amount - existingCredit.amount,
      session
    );

    // Update the daily credit total document
    await updateCredit(
      existingCredit.branchId,
      "dailyCredit",
      data.amount - existingCredit.amount,
      session
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: "Credit document updated successfully." });
  } catch (error) {
    console.error(error);
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = editCredit;
