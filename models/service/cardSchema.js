const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    amountBirr: {
      type: Number,
      required: true,
    },
    blockHouse: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    branchKey: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    callcenterId: {
      type: String,
      required: true,
    },
    callcenterName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dayRemain: {
      type: Number,
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
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    remaingMoney: {
      type: Number,
      required: true,
    },
    fromWhere: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Assigned", "Completed"],
      default: "Assigned",
    },
  },
  { strict: true, timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
