const mongoose = require("mongoose");

const superadminSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
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
    openingDate: {
      type: Date,
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

const SuperadminSchema = mongoose.model("Superadmin", superadminSchema);

module.exports = SuperadminSchema;