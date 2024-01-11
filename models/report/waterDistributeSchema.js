const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaterDistributeSchema = new Schema({
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
  reason: {
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
});

const WaterDistribute = mongoose.model(
  "WaterDistribute",
  WaterDistributeSchema
);

module.exports = WaterDistribute;
