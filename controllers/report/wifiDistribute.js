const mongoose = require("mongoose");
const CompanyGain = require("../../models/price/companyGainSchema");
const WifiDistribute = require("../../models/report/wifiDistributeSchema");
const {
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../models/credit/dailyCreditSchema");
const DeliveryGuyGain = require("../../models/price/deliveryGuyGainSchema");
const updateCredit = require("../../services/creditRelated/updateCredit");
const updateTotalDeliveryGuySalary = require("../../services/reportRelated/updateTotalDeliveryGuySalary");
// const updateField = require("../../services/reportRelated/updateField");
const updateDailyCredit = require("../../services/reportRelated/updateDailyCredit");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const updateDeliveryGuySalaryTable = require("../../services/sheetRelated/update/updateDeliveryGuySalaryTable");

const createWifiDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const companyGainDoc = await CompanyGain.findOne();
    const wifiDistributeGain = companyGainDoc?.wifi_distribute_gain || 30;
    data.gain = data.numberOfCard * wifiDistributeGain;
    data.total = data.amount + data.gain;

    // Create WifiDistribute document
    const wifiDistribute = new WifiDistribute(data);

    // Create DailyCredit documents
    const dailyExpenseCredit = new DailyExpenseCredit({
      sheetId: data.sheetId,
      amount: data.amount,
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "wifiDistribute",
      source: "Report",
      type: "wifiDistribute",
    });

    const dailyGainCredit = new DailyGainCredit({
      sheetId: data.sheetId,
      amount: data.gain,
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "wifiDistribute",
      source: "Report",
      type: "wifiDistribute",
    });

    // Save all documents within the same transaction
    await wifiDistribute.save({ session });
    await dailyExpenseCredit.save({ session });
    await dailyGainCredit.save({ session });

    // Update various fields and documents
    await updateCredit(data.branchId, "dailyCredit", data.amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const wifiDistributePrice = deliveryGuyGainDoc?.wifi_distribute_price || 20;

    const branch = await Branch.findById(data.branchId).session(session);
    await updateDeliveryGuySalaryTable(
      branch.activeDeliverySalaryTable,
      data.deliveryguyId,
      {
        wifiDistribute: wifiDistributePrice,
        total: wifiDistributePrice,
      },
      session
    );
    // await updateField(data.branchId, "wifiDistribute", data.amount, session);
    await updateDailyCredit(data.deliveryguyId, data.amount, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "WifiDistribute and DailyCredit created successfully",
    });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating WifiDistribute and DailyCredit:", error);
    res.status(500).json({
      error: "Error creating WifiDistribute and DailyCredit",
    });
  }
};

module.exports = createWifiDistributeAndDailyCredit;
