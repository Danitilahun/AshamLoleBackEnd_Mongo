const mongoose = require("mongoose");
const CompanyGain = require("../../models/price/companyGainSchema");
const CardDistribute = require("../../models/report/cardDistributeSchema");
const {
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../models/credit/dailyCreditSchema");
const DeliveryGuyGain = require("../../models/price/deliveryGuyGainSchema");
const updateDeliveryGuySalaryTable = require("../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const updateCredit = require("../../services/creditRelated/updateCredit");
const updateDailyCredit = require("../../services/reportRelated/updateDailyCredit");

const createCardDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const companyGainDoc = await CompanyGain.findOne();
    const cardDistributeGain = companyGainDoc?.card_distribute_gain || 20;
    data.gain = data.numberOfCard * cardDistributeGain;
    data.total = data.amount + data.gain;
    // Create CardDistribute document
    const cardDistribute = new CardDistribute(data);

    // Create DailyCredit document
    const dailyExpenseCredit = new DailyExpenseCredit({
      sheetId: data.sheetId,
      amount: data.amount,
      branchId: data.branchId,
      date: data.date,
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
      date: data.date,
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
    await updateCredit(data.branchId, "dailyCredit", data.amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const cardDistributePrice = deliveryGuyGainDoc?.card_distribute_price || 20;
    const branch = await Branch.findById(data.branchId).session(session);

    await updateDeliveryGuySalaryTable(
      branch.activeDeliverySalaryTable,
      data.deliveryguyId,
      {
        cardDistribute: cardDistributePrice,
        total: cardDistributePrice,
      },
      session
    );

    await updateDailyCredit(data.deliveryguyId, data.total, session);
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
