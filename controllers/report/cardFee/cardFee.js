const mongoose = require("mongoose");
const DeliveryGuyGain = require("../../../models/price/deliveryGuyGainSchema");
const updateDailyCredit = require("../../../services/reportRelated/updateDailyCredit");
const {
  DailyExpenseCredit,
} = require("../../../models/credit/dailyCreditSchema");
const CardFee = require("../../../models/report/cardFeeSchema");
const updateCredit = require("../../../services/creditRelated/updateCredit");
const updateDeliveryGuySalaryTable = require("../../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const Branch = require("../../../models/branchRelatedSchema/branchSchema");

const createCardFeeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      sheetId,
      amount,
      branchId,
      date,
      deliveryguyId,
      deliveryguyName,
      numberOfCard,
      returnCardNumber,
      time,
    } = req.body;

    // Create CardFee document
    const cardFee = new CardFee({
      sheetId,
      amount,
      branchId,
      date,
      deliveryguyId,
      deliveryguyName,
      numberOfCard,
      returnCardNumber,
      time,
    });

    // Create DailyCredit document
    const dailyCredit = new DailyExpenseCredit({
      sheetId,
      amount,
      branchId,
      deliveryguyId,
      date,
      deliveryguyName,
      reason: "cardFee",
      source: "Report",
      type: "cardFee",
    });

    // Save both documents within the same transaction
    await cardFee.save({ session });
    await dailyCredit.save({ session });
    await updateDailyCredit(deliveryguyId, amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);

    const cardFeePrice = deliveryGuyGainDoc?.card_fee_price || 10;

    const branch = await Branch.findById(branchId).session(session);

    await updateDeliveryGuySalaryTable(
      branch.activeDeliverySalaryTable,
      deliveryguyId,
      {
        cardFee: cardFeePrice,
        total: cardFeePrice,
      },
      session
    );

    await updateCredit(branchId, "dailyCredit", amount, session);

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
