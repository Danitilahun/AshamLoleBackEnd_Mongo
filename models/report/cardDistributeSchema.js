const mongoose = require("mongoose");

const cardDistributeSchema = new mongoose.Schema(
  {
    CHECK_SOURCE: {
      type: String,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
    activeDailySummery: {
      type: String,
      required: true,
    },
    activeTable: {
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
    createdAt: {
      type: Date,
      required: true,
    },
    date: {
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
    reason: {
      type: String,
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

const CardDistribute = mongoose.model("CardDistribute", cardDistributeSchema);

module.exports = CardDistribute;
