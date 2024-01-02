const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSalarySchema = new Schema({
  staffWorkerInfo: [
    {
      type: Schema.Types.ObjectId,
      ref: "StaffWorkerInfo",
    },
  ],
  sheetId: {
    type: String,
    required: true,
  },
  branchId: {
    type: String,
    required: true,
  },
});

const StaffSalary = mongoose.model("StaffSalary", StaffSalarySchema);

module.exports = StaffSalary;
