const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffWorkerInfoSchema = new Schema({
  addbonus: String,
  bankAccount: String,
  bonus: Number,
  fixedSalary: Number,
  holidayBonus: Number,
  name: String,
  penality: Number,
  total: Number,
  totalCredit: Number,
  uniqueName: String,
});

const StaffWorkerInfo = mongoose.model(
  "StaffWorkerInfo",
  StaffWorkerInfoSchema
);

module.exports = StaffWorkerInfo;
