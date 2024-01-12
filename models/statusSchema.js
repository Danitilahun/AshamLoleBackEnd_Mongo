const mongoose = require("mongoose");

const othersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const statusSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
    },
    date: {
      type: String,
    },
    ethioTelBill: {
      type: Number,
      required: true,
    },
    houseRent: {
      type: Number,
      required: true,
    },
    taxPersentage: {
      type: Number,
      default: 0,
    },
    totalDeliveryGuySalary: {
      type: Number,
      default: 0,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalStaffSalary: {
      type: Number,
      default: 0,
    },
    totaltax: {
      type: Number,
      default: 0,
    },
    totalCredit: {
      type: Number,
      default: 0,
    },
    wifi: {
      type: Number,
      required: true,
    },
    others: [othersSchema],
  },
  { timestamps: true }
);
// Pre-save middleware to populate some fields from the Branch model
statusSchema.pre("save", async function (next) {
  try {
    const branch = await Branch.findOne({ _id: this.branchId });
    if (branch) {
      // Assign values from branch to corresponding fields in Status
      this.ethioTelBill = branch.ethioTelBill;
      this.houseRent = branch.houseRent;
      this.taxPercentage = branch.taxPercentage;
      this.wifi = branch.wifi;

      // Add values to totalExpense
      this.totalExpense =
        branch.ethioTelBill +
        branch.houseRent +
        branch.taxPercentage +
        branch.wifi;

      // Populate others array
      this.others = [];

      if (branch.expenseOneName && branch.expenseOneAmount) {
        this.others.push({
          name: branch.expenseOneName,
          amount: branch.expenseOneAmount,
        });
        this.totalExpense += branch.expenseOneAmount; // Add to totalExpense
      }

      if (branch.expenseTwoName && branch.expenseTwoAmount) {
        this.others.push({
          name: branch.expenseTwoName,
          amount: branch.expenseTwoAmount,
        });
        this.totalExpense += branch.expenseTwoAmount; // Add to totalExpense
      }

      if (branch.expenseThreeName && branch.expenseThreeAmount) {
        this.others.push({
          name: branch.expenseThreeName,
          amount: branch.expenseThreeAmount,
        });
        this.totalExpense += branch.expenseThreeAmount; // Add to totalExpense
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
