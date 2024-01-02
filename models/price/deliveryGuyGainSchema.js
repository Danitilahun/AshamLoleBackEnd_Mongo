const mongoose = require("mongoose");

const deliveryGuyGainSchema = new mongoose.Schema({
  asbezaPrice: {
    type: Number,
    default: 9,
  },
  card_collect_price: {
    type: Number,
    default: 6,
  },
  card_distribute_price: {
    type: Number,
    default: 5,
  },
  card_fee_price: {
    type: Number,
    default: 40,
  },
  fixedSalary: {
    type: Number,
    default: 20,
  },
  water_collect_price: {
    type: Number,
    default: 5,
  },
  water_distribute_price: {
    type: Number,
    default: 5,
  },
  wifi_collect_price: {
    type: Number,
    default: 5,
  },
  wifi_distribute_price: {
    type: Number,
    default: 5,
  },
});

const DeliveryGuyGain = mongoose.model(
  "DeliveryGuyGain",
  deliveryGuyGainSchema
);

module.exports = DeliveryGuyGain;
