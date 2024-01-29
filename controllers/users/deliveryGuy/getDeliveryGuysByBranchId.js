const Deliveryguy = require("../../../models/deliveryguySchema");

// Controller to get all delivery guys based on branchId and return name and id
const getDeliveryGuysByBranchId = async (req, res) => {
  const { branchId } = req.params;

  try {
    const deliveryGuys = await Deliveryguy.find({ branchId }, "_id fullName");

    // Map the results to return an array of { name, id }
    const formattedDeliveryGuys = deliveryGuys.map((deliveryGuy) => ({
      name: deliveryGuy.fullName,
      id: deliveryGuy._id,
    }));

    res.json(formattedDeliveryGuys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getDeliveryGuysByBranchId;
