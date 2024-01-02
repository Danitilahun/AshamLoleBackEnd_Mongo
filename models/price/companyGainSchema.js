const mongoose = require("mongoose");

const companyGainSchema = new mongoose.Schema(
  {
    asbeza_profit: {
      type: Number,
      default: 30,
    },
    card_distribute_gain: {
      type: Number,
      default: 50,
    },
    card_price: {
      type: Number,
      default: 20,
    },
    water_distribute_gain: {
      type: Number,
      default: 30,
    },
    wifi_distribute_gain: {
      type: Number,
      default: 30,
    },
  },
  { timestamps: true }
);

const CompanyGain = mongoose.model("CompanyGain", companyGainSchema);

module.exports = CompanyGain;
