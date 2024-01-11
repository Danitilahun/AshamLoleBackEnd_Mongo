const mongoose = require("mongoose");

const DeliveryGuyGain = require("../../../models/price/deliveryGuyGainSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const updateDailyCreditForBranch = require("../../../services/reportRelated/updateDailyCreditForBranch");
const updateTotalDeliveryGuySalary = require("../../../services/reportRelated/updateTotalDeliveryGuySalary");
const updateField = require("../../../services/reportRelated/updateField");
const {
  DailyExpenseCredit,
} = require("../../../models/credit/dailyCreditSchema");
const CardFee = require("../../../models/report/cardFeeSchema");

const createCardFeeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      sheetId,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      numberOfCard,
      reason,
      returnCardNumber,
      time,
    } = req.body;

    // Create CardFee document
    const cardFee = new CardFee({
      sheetId,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      numberOfCard,
      reason,
      returnCardNumber,
      time,
    });

    // Create DailyCredit document
    const dailyCredit = new DailyExpenseCredit({
      sheetId,
      amount,
      branchId,
      deliveryguyId,
      deliveryguyName,
      reason: "cardFee",
      source,
    });

    // Save both documents within the same transaction
    await cardFee.save({ session });
    await dailyCredit.save({ session });
    await updateDailyCredit(deliveryguyId, amount, session);
    await updateDailyCreditForBranch(branchId, amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const cardFeePrice = deliveryGuyGainDoc.card_fee_price;
    await updateTotalDeliveryGuySalary(branchId, cardFeePrice, session);
    await updateField(branchId, "cardFee", amount, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "CardFee and DailyCredit created successfully" });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating CardFee and DailyCredit:", error);
    res.status(500).json({ error: "Error creating CardFee and DailyCredit" });
  }
};

module.exports = createCardFeeAndDailyCredit;
