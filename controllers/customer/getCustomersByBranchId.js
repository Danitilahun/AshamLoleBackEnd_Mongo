const Customer = require("../../models/customerSchema");

const getCustomersByBranchId = async (req, res) => {
  const { branchId } = req.params;
  try {
    const customers = await Customer.find({ branchId });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers by branchId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCustomersByBranchId };
