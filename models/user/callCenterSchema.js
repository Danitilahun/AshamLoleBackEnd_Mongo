const mongoose = require("mongoose");

const callCenterSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    disable: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const CallCenter = mongoose.model("CallCenter", callCenterSchema);

module.exports = CallCenter;
