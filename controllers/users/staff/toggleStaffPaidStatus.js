const Staff = require("../../../models/staffSchema");

const toggleStaffPaidStatus = async (req, res) => {
  const { staffId } = req.params;

  try {
    // Find the staff member by ID
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Toggle the "paid" status
    staff.paid = !staff.paid;

    // Save the updated staff member
    await staff.save();

    res.status(200).json({
      message: "Staff paid status toggled successfully",
      paid: staff.paid,
    });
  } catch (error) {
    console.error("Error toggling staff paid status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { toggleStaffPaidStatus };
