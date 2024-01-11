const mongoose = require("mongoose");

const deliveryGuyWorkSchema = new mongoose.Schema({
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
  hotelProfit: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const DeliveryGuyWork = mongoose.model(
  "DeliveryGuyWork",
  deliveryGuyWorkSchema
);

module.exports = DeliveryGuyWork;
