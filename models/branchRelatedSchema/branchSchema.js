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
    taxPersentage: {
      type: Number,
      default: 0,
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
    openingDate: {
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
      default: 0,
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

    date: {
      type: String,
    },

    managerId: {
      type: String,
    },

    activeDailySummery: {
      type: String,
      default: "",
    },
    activeDGSummery: {
      type: String,
      default: "",
    },

    activeSheet: {
      type: String,
      default: "",
    },

    activeTable: {
      type: String,
      default: "",
    },

    activeCalculator: {
      type: String,
      default: "",
    },

    activeDeliverySalaryTable: {
      type: String,
      default: "",
    },

    activeStaffSalarySheet: {
      type: String,
      default: "",
    },

    sheetStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Completed",
    },
  },
  { strict: true, timestamps: true }
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
