const mongoose = require("mongoose");
const { DailyGainCredit } = require("../../models/credit/dailyCreditSchema");
const updateDailyCredit = require("../../services/reportRelated/updateDailyCredit");
const HotelProfit = require("../../models/report/hotelProfitSchema");

const createHotelProfitAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const data = req.body;

    // Create HotelProfit document
    const hotelProfit = new HotelProfit(data);

    // Create DailyCredit document
    const dailyCredit = new DailyGainCredit({
      sheetId: data.sheetId,
      amount: data.amount,
      branchId: data.branchId,
      date: data.date,
      deliveryguyId: data.deliveryguyId,
      deliveryguyName: data.deliveryguyName,
      reason: "hotelProfit",
      source: "Report",
      type: "hotelProfit",
    });

    // Save both documents within the same transaction
    await hotelProfit.save({ session });
    await dailyCredit.save({ session });
    await updateDailyCredit(data.deliveryguyId, data.amount, session);
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json({ message: "HotelProfit and DailyCredit created successfully" });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating HotelProfit and DailyCredit:", error);
    res
      .status(500)
      .json({ error: "Error creating HotelProfit and DailyCredit" });
  }
};

module.exports = createHotelProfitAndDailyCredit;
