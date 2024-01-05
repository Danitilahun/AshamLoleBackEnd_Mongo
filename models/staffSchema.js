const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
  {
    bankAccount: String,
    branchId: String,
    createdAt: Date,
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
  { timestamps: true }
);

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
