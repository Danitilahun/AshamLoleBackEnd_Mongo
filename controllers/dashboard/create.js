const mongoose = require("mongoose");
const Dashboard = require("../../models/dashboardSchema");

const createDashboard = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const dashboardData = {
      totalBudget: 0,
      totalCustomer: 0,
      totalEmployees: 0,
      totalExpense: 0,
      totalIncome: 0,
      activeEmployees: 0,
    };
    const newDashboardData = await Dashboard.create([dashboardData], {
      session,
    });

    await session.commitTransaction();
    res.status(201).json({ success: true, data: newDashboardData });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
};

module.exports = createDashboard;
