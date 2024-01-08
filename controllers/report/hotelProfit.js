const mongoose = require("mongoose");
const HotelProfit = require("../models/HotelProfit"); // Update the path to your HotelProfit model
const DailyCredit = require("../models/DailyCredit"); // Update the path to your DailyCredit model

const createHotelProfitAndDailyCredit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      // Capture required fields for HotelProfit
      // Update the fields below as per your schema
      field1,
      field2,
      // ... other fields for HotelProfit
    } = req.body;

    // Create HotelProfit document
    const hotelProfit = new HotelProfit({
      field1,
      field2,
      // ... other fields for HotelProfit
    });

    // Create DailyCredit document
    const dailyCredit = new DailyCredit({
      // Capture required fields for DailyCredit
      // Update the fields below as per your schema
      fieldA,
      fieldB,
      // ... other fields for DailyCredit
    });

    // Save both documents within the same transaction
    await hotelProfit.save({ session });
    await dailyCredit.save({ session });

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
