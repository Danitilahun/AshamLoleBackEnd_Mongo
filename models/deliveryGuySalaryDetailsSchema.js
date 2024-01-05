const mongoose = require("mongoose");

const deliveryGuySalaryDetailsSchema = new mongoose.Schema({
  asbezaNumber: {
    type: Number,
    default: 0,
  },
  bonus: {
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
  fixedSalary: {
    type: Number,
    default: 0,
  },
  holidayBonus: {
    type: Number,
    default: 0,
  },
  penality: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  totalCredit: {
    type: Number,
    default: 0,
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

const DeliveryGuySalaryDetails = mongoose.model(
  "DeliveryGuySalaryDetails",
  deliveryGuySalaryDetailsSchema
);

module.exports = DeliveryGuySalaryDetails;
