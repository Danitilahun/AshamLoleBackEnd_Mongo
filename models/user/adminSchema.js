const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    sheetId: {
      type: String,
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    difference: {
      type: Number,
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
    uniqueName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
