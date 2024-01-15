const mongoose = require("mongoose");
const Card = require("../../../models/service/cardSchema");

const getCardInfo = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { branchId, deleteAfterGet } = req.body;

    if (!branchId) {
      return res.status(400).json({
        message: "Branch ID is required in the request body.",
      });
    }

    let cardInfo = await Card.find({ branchId }).session(session);

    if (!cardInfo || cardInfo.length === 0) {
      return res.status(404).json({
        message: "No Card information found for the provided branch ID.",
      });
    }

    // Manipulate the data based on the 'deleteAfterGet' flag
    if (deleteAfterGet) {
      await Card.deleteMany({ branchId }).session(session);
    }

    // Order fields as per your specific requirements
    const result = cardInfo.map((item) => {
      const { deliveryguyId, callcenterId, branchKey, branchId, ...rest } =
        item.toObject();

      return {
        Name: rest.name,
        Phone: rest.phone,
        BlockHouse: rest.blockHouse,
        AmountBirr: rest.amountBirr,
        CardBranch: rest.cardBranch,
        Date: rest.date,
        DayRemain: rest.dayRemain,
        DeliveryguyName: rest.deliveryguyName,
        RemainingMoney: rest.remaingMoney,
        Status: rest.status,
      };
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      data: result,
      message: `Card information retrieved successfully.`,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCardInfo;
