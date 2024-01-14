const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    taxPercentage: {
      type: Number,
      required: true,
    },
    ethioTelBill: {
      type: Number,
      required: true,
    },
    ethioTelAccount: {
      type: String,
      required: true,
    },
    ethioTelOwnerName: {
      type: String,
      required: true,
    },
    wifi: {
      type: Number,
      required: true,
    },
    wifiAccount: {
      type: String,
      required: true,
    },
    wifiOwnerName: {
      type: String,
      required: true,
    },
    houseRent: {
      type: Number,
      required: true,
    },
    houseRentAccount: {
      type: String,
      required: true,
    },
    houseRentOwnerName: {
      type: String,
      required: true,
    },
    numberOfWorker: {
      type: Number,
      default: "",
    },
    houseRentOwnerName: {
      type: String,
      required: true,
    },
    expenseOneName: {
      type: String,
      default: "",
    },
    expenseOneAmount: {
      type: Number,
      default: 0,
    },
    expenseTwoName: {
      type: String,
      default: "",
    },
    expenseTwoAmount: {
      type: Number,
      default: 0,
    },
    expenseThreeName: {
      type: String,
      default: "",
    },
    expenseThreeAmount: {
      type: Number,
      default: 0,
    },
    uniqueName: String,
    paid: {
      type: Boolean,
      default: false,
    },
    customerNumber: {
      type: Number,
      default: 0,
    },
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

    managerName: {
      type: String,
    },

    date: {
      type: String,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    activeDailySummery: {
      type: String,
    },
    activeDGSummery: {
      type: String,
    },

    activeSheet: {
      type: String,
    },

    activeTable: {
      type: String,
    },

    activeCalculator: {
      type: String,
    },

    activeDeliverySalaryTable: {
      type: String,
    },

    activeStaffSalarySheet: {
      type: String,
    },

    sheetStatus: {
      type: String,
      enum: ["Pending", "Completed"],
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
