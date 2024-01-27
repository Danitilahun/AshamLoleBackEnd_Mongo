const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffWorkerInfoSchema = new Schema(
  {
    addbonus: { type: String, default: "0" },
    bonus: { type: Number, default: 0 },
    fixedSalary: { type: Number, default: 0 },
    totalCredit: { type: Number, default: 0 },
    penality: { type: Number, default: 0 },
    holidayBonus: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },

  { strict: true, timestamps: true }
);

const StaffWorkerInfo = mongoose.model(
  "StaffWorkerInfo",
  StaffWorkerInfoSchema
);

module.exports = StaffWorkerInfo;
