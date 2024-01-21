const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    bankAccount: {
      type: String,
      required: [true, "Bank account is required"],
      minlength: [5, "Bank account must be at least 5 characters long"],
      maxlength: [20, "Bank account cannot exceed 20 characters"],
    },
    activated: {
      type: Boolean,
      required: [true, "Activation status is required"],
    },
    branchId: {
      type: String,
      required: [true, "Branch ID is required"],
      minlength: [3, "Branch ID must be at least 3 characters long"],
      maxlength: [15, "Branch ID cannot exceed 15 characters"],
    },
    paid: {
      type: Boolean,
    },
    disable: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [50, "Email cannot exceed 50 characters"],
    },
    fullAddress: {
      type: String,
      required: [true, "Full address is required"],
      minlength: [5, "Full address must be at least 5 characters long"],
      maxlength: [100, "Full address cannot exceed 100 characters"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [2, "Full name must be at least 2 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must be at least 10 characters long"],
      maxlength: [15, "Phone number cannot exceed 15 characters"],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
    securityAddress: {
      type: String,
      required: [true, "Security address is required"],
      minlength: [5, "Security address must be at least 5 characters long"],
      maxlength: [100, "Security address cannot exceed 100 characters"],
    },
    securityName: {
      type: String,
      required: [true, "Security name is required"],
      minlength: [2, "Security name must be at least 2 characters long"],
      maxlength: [50, "Security name cannot exceed 50 characters"],
    },
    securityPhone: {
      type: String,
      required: [true, "Security phone number is required"],
      minlength: [
        10,
        "Security phone number must be at least 10 characters long",
      ],
      maxlength: [15, "Security phone number cannot exceed 15 characters"],
    },
    refreshToken: {
      type: String,
    },
    staffId: {
      type: String,
      required: [true, "Staff ID is required"],
      minlength: [5, "Staff ID must be at least 5 characters long"],
      maxlength: [15, "Staff ID cannot exceed 15 characters"],
    },
    essentialId: {
      type: String,
      required: [true, "Essential ID is required"],
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
    role: {
      type: String,
      default: process.env.ADMIN,
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
