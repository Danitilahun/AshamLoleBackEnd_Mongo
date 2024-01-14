const Customer = require("../../models/customerSchema");

const getCustomersByBranchId = async (req, res) => {
  const { branchId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const customers = await Customer.find({ branchId })
      .skip(skip)
      .limit(Number(pageSize));

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers by branchId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCustomersByBranchId };
