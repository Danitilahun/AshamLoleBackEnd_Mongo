const mongoose = require("mongoose");
const {
  DailyCredit,
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../../models/credit/dailyCreditSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const updateCredit = require("../../../services/creditRelated/updateCredit");

/**
 * Delete a credit document and perform related operations.
 * @param {Object} req - Express.js request object containing the credit ID in the params.
 * @param {Object} res - Express.js response object.
 * @returns {Object} JSON response indicating success or failure.
 */
const deleteCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { creditId } = req.params;
    if (!creditId) {
      return res.status(400).json({
        message: "Credit ID is required for the deletion.",
      });
    }

    // Fetch the existing credit document
    const existingCredit = await DailyCredit.findById(creditId);
    const existingExpenseCredit = await DailyExpenseCredit.findById(creditId);
    const existingGainCredit = await DailyGainCredit.findById(creditId);

    if (!existingCredit && !existingExpenseCredit && !existingGainCredit) {
      return res.status(404).json({
        message: "Credit document with the given ID does not exist.",
      });
    }

    if (existingCredit) {
      await existingCredit.remove();
    } else if (existingExpenseCredit) {
      await existingExpenseCredit.remove();
    } else if (existingGainCredit) {
      await existingGainCredit.remove();
    }
    // Delete the credit document

    // Update the delivery guy's document with negative amount
    await updateDailyCredit(
      existingCredit.deliveryguyId,
      -existingCredit.amount,
      session
    );

    // Update the daily credit total document with negative amount
    await updateCredit(
      existingCredit.branchId,
      "dailyCredit",
      -existingCredit.amount,
      session
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with a success message
    res.status(200).json({ message: "Credit document deleted successfully." });
  } catch (error) {
    console.error(error);
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    // Respond with an error message
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteCredit;
