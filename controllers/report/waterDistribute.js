const mongoose = require("mongoose");
const CompanyGain = require("../../models/price/companyGainSchema");
const WaterDistribute = require("../../models/report/waterDistributeSchema");
const {
  DailyExpenseCredit,
  DailyGainCredit,
} = require("../../models/credit/dailyCreditSchema");
const DeliveryGuyGain = require("../../models/price/deliveryGuyGainSchema");
const updateDailyCredit = require("../../services/reportRelated/updateDailyCredit");
const Branch = require("../../models/branchRelatedSchema/branchSchema");
const updateDeliveryGuySalaryTable = require("../../services/sheetRelated/update/updateDeliveryGuySalaryTable");
const updateCredit = require("../../services/creditRelated/updateCredit");

const createWaterDistributeAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;
    const companyGainDoc = await CompanyGain.findOne();
    const waterDistributeGain = companyGainDoc?.water_distribute_gain || 25;
    data.gain = data.numberOfCard * waterDistributeGain;
    data.total = data.amount + data.gain;

    // Create WaterDistribute document
    const waterDistribute = new WaterDistribute(data);

    // Create DailyCredit documents
    const dailyExpenseCredit = new DailyExpenseCredit({
      sheetId: data.sheetId,
      amount: data.amount,
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "waterDistribute",
      source: "Report",
      type: "waterDistribute",
    });

    const dailyGainCredit = new DailyGainCredit({
      sheetId: data.sheetId,
      amount: data.gain,
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "waterDistribute",
      source: "Report",
      type: "waterDistribute",
    });

    // Save all documents within the same transaction
    await waterDistribute.save({ session });
    await dailyExpenseCredit.save({ session });
    await dailyGainCredit.save({ session });

    // Update various fields and documents
    await updateCredit(data.branchId, "dailyCredit", data.amount, session);
    const deliveryGuyGainDoc = await DeliveryGuyGain.findOne().session(session);
    const waterDistributePrice =
      deliveryGuyGainDoc?.water_distribute_price || 15;

    const branch = await Branch.findById(data.branchId).session(session);

    await updateDeliveryGuySalaryTable(
      branch.activeDeliverySalaryTable,
      data.deliveryguyId,
      {
        waterDistribute: waterDistributePrice,
        total: waterDistributePrice,
      },
      session
    );
    // await updateField(data.branchId, "waterDistribute", data.amount, session);
    await updateDailyCredit(data.deliveryguyId, data.amount, session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "WaterDistribute and DailyCredit created successfully",
    });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating WaterDistribute and DailyCredit:", error);
    res.status(500).json({
      error: "Error creating WaterDistribute and DailyCredit",
    });
  }
};

module.exports = createWaterDistributeAndDailyCredit;
