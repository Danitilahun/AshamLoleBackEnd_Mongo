const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  deliveryGuyWork: [
    {
      type: Schema.Types.ObjectId,
      ref: "DeliveryGuyWork",
    },
  ],
  sheetId: String,
  branchId: String,
});

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = { DeliveryGuyWork, Salary };
