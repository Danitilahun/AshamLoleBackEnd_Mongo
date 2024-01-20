const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const superadminSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    branch: {
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
    refreshToken: {
      type: String,
    },
    createdAt: {
      type: Date,
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
    openingDate: {
      type: Date,
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
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving
superadminSchema.pre("save", async function (next) {
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

const Superadmin = mongoose.model("Superadmin", superadminSchema);

module.exports = Superadmin;
