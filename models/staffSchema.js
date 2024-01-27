const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    bankAccount: String,
    branchId: String,
    fullAddress: String,
    fullName: String,
    paid: Boolean,
    phone: String,
    profileImage: String,
    salary: String,
    securityAddress: String,
    securityName: String,
    securityPhone: String,
    uniqueName: String,
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
