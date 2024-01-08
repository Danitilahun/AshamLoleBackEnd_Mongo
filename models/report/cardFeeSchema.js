const mongoose = require("mongoose");

const cardFeeSchema = new mongoose.Schema(
  {
    CHECK_SOURCE: {
      type: String,
      required: true,
    },
    active: {
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
    gain: {
      type: Number,
      required: true,
    },
    numberOfCard: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    returnCardNumber: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CardFee = mongoose.model("CardFee", cardFeeSchema);

module.exports = CardFee;
