const mongoose = require("mongoose");
const CompanyGain = require("../../models/price/companyGainSchema");
const CardDistribute = require("../../models/report/cardDistributeSchema");
const {
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../models/credit/dailyCreditSchema");
const DeliveryGuyGain = require("../../models/price/deliveryGuyGainSchema");

const createCardDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const companyGainDoc = await CompanyGain.findOne();
    const cardDistributeGain = companyGainDoc.card_distribute_gain;
    data.gain = data.numberOfCard * cardDistributeGain;
    data.total = data.amount + data.gain;
    // Create CardDistribute document
    const cardDistribute = new CardDistribute(data);

    // Create DailyCredit document
    const dailyExpenseCredit = new DailyExpenseCredit({
      sheetId: data.sheetId,
      amount: data.amount,
      branchId: data.branchId,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "cardDistribute",
      source: "Report",
      type: "cardDistribute",
    });

    const dailyGainCredit = new DailyGainCredit({
      sheetId: data.sheetId,
      amount: data.gain,
      branchId: data.branchId,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "cardDistribute",
      source: "Report",
      type: "cardDistribute",
    });

    // Save both documents within the same transaction
    await cardDistribute.save({ session });
    await dailyExpenseCredit.save({ session });
    await dailyGainCredit.save({ session });
    await updateCredit(branchId, "dailyCredit", data.amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const cardDistributePrice = deliveryGuyGainDoc.card_distribute_price;
    await updateTotalDeliveryGuySalary(
      data.branchId,
      cardDistributePrice,
      session
    );

    await updateField(data.branchId, "cardDistribute", data.amount, session);
    await updateDailyCredit(data.deliveryguyId, data.amount, session);
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
