const mongoose = require("mongoose");

const cardDistributeSchema = new mongoose.Schema(
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
    gain: {
      type: Number,
      required: true,
    },
    numberOfCard: {
      type: Number,
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

const CardDistribute = mongoose.model("CardDistribute", cardDistributeSchema);

module.exports = CardDistribute;
