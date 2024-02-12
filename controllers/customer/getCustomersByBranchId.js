const Customer = require("../../models/customerSchema");

const getCustomersByBranchId = async (req, res) => {
  const { branchId } = req.query;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const skip = (page - 1) * pageSize;
    const customers = await Customer.find({ branchId })
      .skip(skip)
      .limit(Number(pageSize))
      .lean(); // Convert to plain JavaScript objects

    const currentDate = new Date();

    // Format createdAt and add lastSeen field to each customer object
    customers.forEach((customer) => {
      const updatedAt = new Date(customer.updatedAt);
      const createdAt = new Date(customer.createdAt);

      // Format createdAt to "Month Day, Year" format
      customer.day = createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      const timeDiff = currentDate - updatedAt; // Time difference in milliseconds
      const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      customer.lastSeen = dayDiff;
    });

    console.log("Customers:", customers);
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers by branchId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCustomersByBranchId };
