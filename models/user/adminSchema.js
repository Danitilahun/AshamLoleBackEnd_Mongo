const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      required: true,
    },
    branchId: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    difference: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
    disable: {
      type: Boolean,
      required: true,
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
      required: true,
    },
    salary: {
      type: String,
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
    refreshToken: {
      type: String,
    },
    uniqueName: {
      type: String,
      required: true,
    },
    staffId: {
      type: String,
      required: true,
    },
    essentialId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
adminSchema.pre("save", async function (next) {
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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
