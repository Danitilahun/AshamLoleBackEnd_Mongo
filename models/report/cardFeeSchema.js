const mongoose = require("mongoose");

const cardFeeSchema = new mongoose.Schema(
  {
    sheetId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    deliveryguyId: {
      type: String,
      required: true,
    },
    deliveryguyName: {
      type: String,
      required: true,
    },
    numberOfCard: {
      type: Number,
      required: true,
    },
    returnCardNumber: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { strict: true, timestamps: true }
);

const CardFee = mongoose.model("CardFee", cardFeeSchema);

module.exports = CardFee;
