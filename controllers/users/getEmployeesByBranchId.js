const Deliveryguy = require("../../models/deliveryguySchema");
const Staff = require("../../models/staffSchema");

const getEmployeesByBranchId = async (req, res) => {
  const { branchId } = req.params;

  try {
    // Query delivery guys
    const deliveryGuys = await Deliveryguy.find({ branchId });

    // Query staff
    const staffMembers = await Staff.find({ branchId });

    // Extract relevant information for delivery guys
    const deliveryGuysInfo = deliveryGuys.map((deliveryGuy) => ({
      id: deliveryGuy._id,
      name: deliveryGuy.fullName,
      role: "DeliveryGuy",
    }));

    // Extract relevant information for staff members
    const staffInfo = staffMembers.map((staff) => ({
      id: staff._id,
      name: staff.fullName,
      role: staff.role, // Assuming role is directly used in Staff model
    }));

    // Combine the results
    const employeesInfo = [...deliveryGuysInfo, ...staffInfo];

    // Send the response
    res.status(200).json(employeesInfo);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getEmployeesByBranchId;
