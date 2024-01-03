const Dashboard = require("../../models/dashboardSchema");

const createDashboard = async (req, res) => {
  try {
    const dashboardData = {
      totalBudget: 0,
      totalCustomer: 0,
      totalEmployees: 0,
      totalExpense: 0,
      totalIncome: 0,
      activeEmployees: 0,
    };
    const newDashboardData = await Dashboard.create(dashboardData);

    res.status(201).json({ success: true, data: newDashboardData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = createDashboard;
