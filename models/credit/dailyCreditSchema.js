const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyCreditSchema = new Schema({
  uniqueDailyCreditId: {
    type: String,
    required: true,
  },
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
  price: {
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
  total: {
    type: Number,
    required: true,
  },
});

const DailyCredit = mongoose.model("DailyCredit", DailyCreditSchema);

module.exports = DailyCredit;
