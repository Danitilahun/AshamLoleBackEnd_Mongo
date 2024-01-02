const mongoose = require("mongoose");

const essentialSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EssentialSchema = mongoose.model("Essential", essentialSchema);

module.exports = EssentialSchema;
