const mongoose = require("mongoose");

const companyGainSchema = new mongoose.Schema(
  {
    asbeza_profit: {
      type: Number,
      default: 0,
    },
    card_distribute_gain: {
      type: Number,
      default: 0,
    },
    card_price: {
      type: Number,
      default: 0,
    },
    water_distribute_gain: {
      type: Number,
      default: 0,
    },
    wifi_distribute_gain: {
      type: Number,
      default: 0,
    },
  },
  { strict: true, timestamps: true }
);

const CompanyGain = mongoose.model("CompanyGain", companyGainSchema);

module.exports = CompanyGain;
