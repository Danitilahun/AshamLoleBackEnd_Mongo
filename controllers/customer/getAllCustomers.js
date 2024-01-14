const Customer = require("../../models/customerSchema");

const getAllCustomers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const customers = await Customer.find().skip(skip).limit(Number(pageSize));

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching all customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllCustomers };
