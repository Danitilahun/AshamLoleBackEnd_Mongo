const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SheetsSchema = new Schema(
  {
    Tables: [
      {
        type: Schema.Types.ObjectId,
        ref: "DailyTable",
      },
    ],
    activeDailySummery: {
      type: String,
      required: true,
    },
    activeDGSummery: {
      type: String,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    previousActive: {
      type: String,
      default: "",
    },
    realDate: {
      type: Date,
      required: true,
    },
    sheetNumber: {
      type: Number,
    },
    sheetStatus: {
      type: String,
      default: "Pending",
    },
    tableCount: {
      type: Number,
      default: 0,
    },
  },
  { strict: true, timestamps: true }
);

// Pre-save middleware to set sheetNumber based on branchId count
SheetsSchema.pre("save", async function (next) {
  try {
    // Count existing sheets with the same branchId
    const count = await this.constructor.countDocuments({
      branchId: this.branchId,
    });

    // Set the sheetNumber for the new sheet
    this.sheetNumber = count + 1;

    next();
  } catch (err) {
    next(err);
  }
});

const Sheet = mongoose.model("Sheets", SheetsSchema);

module.exports = Sheet;
