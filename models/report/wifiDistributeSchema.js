const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WifiDistributeSchema = new Schema(
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
  { strict: true, timestamps: true }
);

const WifiDistribute = mongoose.model("WifiDistribute", WifiDistributeSchema);

module.exports = WifiDistribute;
