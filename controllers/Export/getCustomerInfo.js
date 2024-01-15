const Customer = require("../../models/customerSchema");

const getCustomerInfo = async (req, res) => {
  try {
    const { branchId } = req.body;

    if (!branchId) {
      return res.status(400).json({
        message: "Branch ID is required in the request body.",
      });
    }

    let customerInfo = await Customer.find({ branchId });

    if (!customerInfo || customerInfo.length === 0) {
      return res.status(404).json({
        message: "No customer information found for the provided branch ID.",
      });
    }

    // Order fields as per your specific requirements
    const result = customerInfo.map((item) => {
      const { _id, __v, ...rest } = item.toObject();

      return {
        BlockHouse: rest.blockHouse,
        BranchName: rest.branchName,
        Name: rest.name,
        Phone: rest.phone,
        Asbeza: rest.Asbeza,
        Card: rest.Card,
        Water: rest.Water,
        Wifi: rest.Wifi,
      };
    });

    res.status(200).json({
      data: result,
      message: `Customer information retrieved successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = getCustomerInfo;
