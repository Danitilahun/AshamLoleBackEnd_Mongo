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
      this.ethioTelBill = branch.ethioTelBill;
      this.houseRent = branch.houseRent;
      this.taxPercentage = branch.taxPercentage;
      this.wifi = branch.wifi;

      // Populate others array
      this.others = [];

      if (branch.expenseOneName && branch.expenseOneAmount) {
        this.others.push({
          name: branch.expenseOneName,
          amount: branch.expenseOneAmount,
        });
      }

      if (branch.expenseTwoName && branch.expenseTwoAmount) {
        this.others.push({
          name: branch.expenseTwoName,
          amount: branch.expenseTwoAmount,
        });
      }

      if (branch.expenseThreeName && branch.expenseThreeAmount) {
        this.others.push({
          name: branch.expenseThreeName,
          amount: branch.expenseThreeAmount,
        });
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
