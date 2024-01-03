const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  totalBudget: {
    type: Number,
    default: 101236,
  },
  totalCustomer: {
    type: Number,
    default: 3821,
  },
  totalEmployees: {
    type: Number,
    default: 21,
  },
  totalExpense: {
    type: Number,
    default: 70586.5,
  },
  totalIncome: {
    type: Number,
    default: 41240,
  },
  activeEmployees: {
    type: Number,
    default: 20,
  },
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;
