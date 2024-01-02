const mongoose = require("mongoose");

const remindersSchema = new mongoose.Schema({
  callcenterId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["water", "card", "wifi", "asbeza", "other"],
    required: true,
  },
});

const Reminders = mongoose.model("Reminders", remindersSchema);

module.exports = Reminders;
