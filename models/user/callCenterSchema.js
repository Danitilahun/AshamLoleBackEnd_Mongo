const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const callCenterSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: [true, "Bank account is required"],
    },
    refreshToken: {
      type: String,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: process.env.CALLCENTER,
    },
    essentialId: {
      type: String,
      required: [true, "Essential ID is required"],
    },
    disable: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    fullAddress: {
      type: String,
      required: [true, "Full address is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
    securityAddress: {
      type: String,
      required: [true, "Security address is required"],
    },
    securityName: {
      type: String,
      required: [true, "Security name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [20, "Password cannot exceed 20 characters"],
      validate: {
        validator: function (value) {
          const lowercaseRegex = /^(?=.*[a-z])/.test(value);
          const uppercaseRegex = /^(?=.*[A-Z])/.test(value);
          const numberRegex = /^(?=.*[0-9])/.test(value);
          const specialCharRegex = /^(?=.*[!@#$%^&*])/.test(value);

          if (!lowercaseRegex) {
            throw new Error(
              "Password must contain at least one lowercase letter"
            );
          }
          if (!uppercaseRegex) {
            throw new Error(
              "Password must contain at least one uppercase letter"
            );
          }
          if (!numberRegex) {
            throw new Error("Password must contain at least one number");
          }
          if (!specialCharRegex) {
            throw new Error(
              "Password must contain at least one special character (!@#$%^&*)"
            );
          }

          return true;
        },
      },
    },

    securityPhone: {
      type: String,
      required: [true, "Security phone number is required"],
    },
  },
  { strict: true, timestamps: true }
);

callCenterSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const CallCenter = mongoose.model("CallCenter", callCenterSchema);

module.exports = CallCenter;
