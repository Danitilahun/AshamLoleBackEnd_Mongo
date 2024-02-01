const mongoose = require("mongoose");
const {
  DailyCredit,
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../../models/credit/dailyCreditSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");
const CardDistribute = require("./reportDelete/CardDistribute");
const waterDistribute = require("./reportDelete/waterDistribute");
const wifiDistribute = require("./reportDelete/wifiDistribute");
const HotelProfit = require("./reportDelete/HotelProfit");
const CardFee = require("./reportDelete/cardFee");

/**
 * Helper function to perform common updates during credit deletion.
 * @param {Object} credit - Credit document to update.
 * @param {Object} session - Mongoose session.
 */
const performCommonUpdates = async (credit, session) => {
  await updateDailyCredit(credit.deliveryguyId, -credit.amount, session);
  await updateCredit(credit.branchId, "dailyCredit", -credit.amount, session);
};

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

    // Fetch the existing credit document
    const existingCredit = await DailyCredit.findByIdAndDelete(creditId);
    const existingExpenseCredit = await DailyExpenseCredit.findByIdAndDelete(
      creditId
    );
    const existingGainCredit = await DailyGainCredit.findByIdAndDelete(
      creditId
    );

    if (!existingCredit && !existingExpenseCredit && !existingGainCredit) {
      return res.status(404).json({
        message: "Credit document with the given ID does not exist.",
      });
    }

    console.log(existingCredit);
    if (existingCredit) {
      await performCommonUpdates(existingCredit, session);
    } else if (existingExpenseCredit) {
      await performCommonUpdates(existingExpenseCredit, session);
      const branch = await Branch.findById(existingExpenseCredit.branchId);
      if (existingExpenseCredit.type === "cardFee") {
        await CardFee({ ...branch, ...existingExpenseCredit }, session);
      }
    } else if (existingGainCredit) {
      const branch = await Branch.findById(existingGainCredit.branchId);

      if (existingExpenseCredit.type === "cardDistribute") {
        await CardDistribute({ ...branch, ...existingGainCredit }, session);
      } else if (existingExpenseCredit.type === "waterDistribute") {
        await waterDistribute({ ...branch, ...existingGainCredit }, session);
      } else if (existingExpenseCredit.type === "wifiDistribute") {
        await wifiDistribute({ ...branch, ...existingGainCredit }, session);
      } else if (existingExpenseCredit.type === "hotelProfit") {
        await HotelProfit({ ...branch, ...existingGainCredit }, session);
      }
    }

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
