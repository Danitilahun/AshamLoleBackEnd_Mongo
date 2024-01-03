const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchIncomeFromSourceSchema = new Schema({
  Asbeza: {
    type: Number,
    default: 0,
  },
  Card: {
    type: Number,
    default: 0,
  },
  Wifi: {
    type: Number,
    default: 0,
  },
  Water: {
    type: Number,
    default: 5190,
  },
  Hotel: {
    type: Number,
    default: 3601,
  },
  branchId: {
    type: String,
  },
});

const BranchIncomeFromSource = mongoose.model(
  "BranchIncomeFromSource",
  branchIncomeFromSourceSchema
);

module.exports = BranchIncomeFromSource;
