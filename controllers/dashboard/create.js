const Dashboard = require("../../models/dashboardSchema");
const createDocument = require("../../services/common/create.doc");

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
    // Use createDocument function to create a new dashboard document
    const newDashboardData = await createDocument(Dashboard, dashboardData);

    res.status(201).json({ success: true, data: newDashboardData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = createDashboard;
