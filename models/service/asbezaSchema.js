const mongoose = require("mongoose");

const asbezaSchema = new mongoose.Schema(
  {
    additionalInfo: {
      type: String,
      required: true,
    },

    blockHouse: {
      type: String,
      required: true,
    },

    branchId: {
      type: String,
      required: true,
    },

    branchKey: {
      type: String,
      required: true,
    },

    branchName: {
      type: String,
      required: true,
    },

    callcenterId: {
      type: String,
      required: true,
    },

    callcenterName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    deliveryguyId: {
      type: String,
      required: true,
    },

    deliveryguyName: {
      type: String,
      required: true,
    },

    fromWhere: {
      type: String,
      required: ["branch", "callcenter"],
    },

    name: {
      type: String,
      required: true,
    },

    order: {
      type: [String],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Assigned", "Completed"],
    },
  },
  { strict: true, timestamps: true }
);

const Asbeza = mongoose.model("Asbeza", asbezaSchema);

module.exports = Asbeza;
