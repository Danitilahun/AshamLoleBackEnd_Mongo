const Customer = require("../../models/customerSchema");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllCustomers };
