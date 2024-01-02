const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  active: String,
  bankAccount: String,
  branchId: String,
  createdAt: Date,
  fullAddress: String,
  fullName: String,
  paid: Boolean,
  phone: String,
  profileImage: String,
  role: String,
  salary: String,
  securityAddress: String,
  securityName: String,
  securityPhone: String,
  staffCredit: Number,
  uniqueName: String,
  updatedAt: Date,
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
