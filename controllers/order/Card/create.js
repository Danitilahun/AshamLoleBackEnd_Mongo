const mongoose = require("mongoose");
const Card = require("../../../models/service/cardSchema");
const Customer = require("../../../models/customerSchema");
const shiftDeliveryGuyInAndOutQueue = require("../shiftDeliveryGuyInAndOutQueue");
const CompanyGain = require("../../../models/price/companyGainSchema");

const createCustomerAndCard = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { blockHouse, branchId, branchName, name, phone } = req.body;
    const companyGainDoc = await CompanyGain.findOne();
    const cardPrice = companyGainDoc?.card_price || 20;
    const data = req.body;
    data.dayRemain = data.amountBirr / cardPrice;
    data.remaingMoney = data.amountBirr;
    const newCard = new Card(data);

    const newCustomer = new Customer({
      Card: "YES",
      blockHouse,
      branchId,
      branchName,
      blockHouse,
      name,
      phone,
      orderId: newCard._id,
    });

    await newCard.save({ session });
    await newCustomer.save({ session });
    await shiftDeliveryGuyInAndOutQueue(
      req.body.deliveryguyId,
      req.body.branchId,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Card created successfully",
      newCard,
      newCustomer,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: error.message });
  }
};

module.exports = createCustomerAndCard;
