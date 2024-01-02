const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    account: String,
    budget: Number,
    taxPercentage: Number,
    ethioTelBill: Number,
    ethioTelAccount: String,
    ethioTelOwnerName: String,
    wifi: Number,
    wifiAccount: String,
    wifiOwnerName: String,
    houseRent: Number,
    houseRentAccount: String,
    houseRentOwnerName: String,
    expenseOneName: String,
    expenseOneAmount: Number,
    expenseTwoName: String,
    expenseTwoAmount: Number,
    expenseThreeName: String,
    expenseThreeAmount: Number,
    uniqueName: String,
    paid: Boolean,
    customerNumber: String,
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate the unique name based on existing branches count
branchSchema.pre("save", async function (next) {
  try {
    const count = await this.model("Branch").countDocuments(); // Count existing documents in the Branch model
    this.uniqueName = `B-${count + 1}`; // Set the unique name for the new branch
    next();
  } catch (err) {
    next(err);
  }
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
