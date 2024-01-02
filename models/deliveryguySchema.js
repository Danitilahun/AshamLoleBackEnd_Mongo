const mongoose = require("mongoose");

const deliveryguySchema = new mongoose.Schema(
  {
    activeness: {
      type: Boolean,
      default: false,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    dailyCredit: {
      type: Number,
      default: 0,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    securityAddress: {
      type: String,
      required: true,
    },
    securityName: {
      type: String,
      required: true,
    },
    securityPhone: {
      type: String,
      required: true,
    },
    staffCredit: {
      type: Number,
      default: 0,
    },
    uniqueName: {
      type: String,
      required: true,
    },
    waiting: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Deliveryguy = mongoose.model("Deliveryguy", deliveryguySchema);

module.exports = Deliveryguy;
