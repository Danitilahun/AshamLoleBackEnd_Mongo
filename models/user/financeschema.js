const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const financeschema = new mongoose.Schema(
  {
    budgetSummery: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
    },
    essentialId: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    bank: {
      type: [String],
      required: true,
    },
    bankAccount: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
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
      default: "",
    },
    salary: {
      type: Number,
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
    totalExpense: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
financeschema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Set the hashed password
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const Finance = mongoose.model("Finance", financeschema);

module.exports = Finance;
