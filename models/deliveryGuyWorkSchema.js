const mongoose = require("mongoose");

const deliveryGuyWorkSchema = new mongoose.Schema({
  asbezaNumber: {
    type: Number,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  bonus: {
    type: Number,
    required: true,
  },
  cardCollect: {
    type: Number,
    required: true,
  },
  cardDistribute: {
    type: Number,
    required: true,
  },
  cardFee: {
    type: Number,
    required: true,
  },
  fixedSalary: {
    type: Number,
    required: true,
  },
  holidayBonus: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  penality: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  totalCredit: {
    type: Number,
    required: true,
  },
  uniqueName: {
    type: String,
    required: true,
  },
  waterCollect: {
    type: Number,
    required: true,
  },
  waterDistribute: {
    type: Number,
    required: true,
  },
  wifiCollect: {
    type: Number,
    required: true,
  },
  wifiDistribute: {
    type: Number,
    required: true,
  },
  sheetId: String,
  branchId: String,
});

const DeliveryGuyWork = mongoose.model(
  "DeliveryGuyWork",
  deliveryGuyWorkSchema
);

module.exports = DeliveryGuyWork;
