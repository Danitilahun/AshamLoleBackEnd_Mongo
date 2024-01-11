const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyWorksSchema = new Schema({
  asbezaNumber: {
    type: Number,
    default: 0,
  },
  asbezaProfit: {
    type: Number,
    default: 0,
  },
  cardCollect: {
    type: Number,
    default: 0,
  },
  cardDistribute: {
    type: Number,
    default: 0,
  },
  cardFee: {
    type: Number,
    default: 0,
  },
  hotelProfit: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  uniqueName: {
    type: String,
    required: true,
  },
  waterCollect: {
    type: Number,
    default: 0,
  },
  waterDistribute: {
    type: Number,
    default: 0,
  },
  wifiCollect: {
    type: Number,
    default: 0,
  },
  wifiDistribute: {
    type: Number,
    default: 0,
  },
});

const CompanyWorks = mongoose.model("CompanyWorks", CompanyWorksSchema);

module.exports = CompanyWorks;
