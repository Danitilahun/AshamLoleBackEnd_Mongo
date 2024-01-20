const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ashamStaffSchema = new Schema({
  branchId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const AshamStaff = mongoose.model("AshamStaff", ashamStaffSchema);

module.exports = AshamStaff;
