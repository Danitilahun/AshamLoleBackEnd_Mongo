const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    bankAccount: {
      type: String,
      required: [true, "Bank account is required"],
    },
    branchId: {
      type: String,
      required: true,
    },

    fullAddress: {
      type: String,
      required: [true, "Full address is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    paid: {
      type: Boolean,
      default: true,
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
    role: {
      type: String,
      default: "staff",
    },
    securityAddress: {
      type: String,
      required: [true, "Security address is required"],
    },
    securityName: {
      type: String,
      required: [true, "Security name is required"],
    },
    securityPhone: {
      type: String,
      required: [true, "Security phone is required"],
    },
    uniqueName: {
      type: String,
      required: [true, "Unique name is required"],
    },
  },
  { strict: true, timestamps: true }
);

// Pre-save middleware to generate uniqueName based on the count of staff with the same branchId
StaffSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const count = await mongoose.models.Staff.countDocuments({
        branchId: this.branchId,
      });

      this.uniqueName = `S-${count + 1}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});
const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
