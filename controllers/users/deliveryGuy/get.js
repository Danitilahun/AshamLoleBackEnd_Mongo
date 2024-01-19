const Deliveryguy = require("../../../models/deliveryguySchema");

const getDeliveryguyById = async (req, res) => {
  try {
    const deliveryguyId = req.params.id;

    // Fetch the delivery guy by ID from the database
    const deliveryguy = await Deliveryguy.findById(deliveryguyId);

    if (!deliveryguy) {
      return res.status(404).json({ error: "Delivery guy not found" });
    }

    // Respond with the retrieved delivery guy
    res.status(200).json({
      message: "Delivery guy retrieved successfully",
      deliveryguy,
    });
  } catch (error) {
    // Handle errors, if any
    console.error("Error in getDeliveryguyById:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getDeliveryguyById;
