const mongoose = require("mongoose");

const essentialSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
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
  { strict: true, timestamps: true }
);

const Essential = mongoose.model("Essential", essentialSchema);

module.exports = Essential;
