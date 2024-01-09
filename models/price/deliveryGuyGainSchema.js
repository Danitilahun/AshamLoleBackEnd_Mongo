const mongoose = require("mongoose");

const deliveryGuyGainSchema = new mongoose.Schema({
  asbezaPrice: {
    type: Number,
    default: 0,
  },
  card_collect_price: {
    type: Number,
    default: 0,
  },
  card_distribute_price: {
    type: Number,
    default: 0,
  },
  card_fee_price: {
    type: Number,
    default: 0,
  },
  fixedSalary: {
    type: Number,
    default: 0,
  },
  water_collect_price: {
    type: Number,
    default: 0,
  },
  water_distribute_price: {
    type: Number,
    default: 0,
  },
  wifi_collect_price: {
    type: Number,
    default: 0,
  },
  wifi_distribute_price: {
    type: Number,
    default: 0,
  },
});

const DeliveryGuyGain = mongoose.model(
  "DeliveryGuyGain",
  deliveryGuyGainSchema
);

module.exports = DeliveryGuyGain;
