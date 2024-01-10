const Staff = require("../../../models/staffSchema");

// Delete a staff member
const deleteStaffMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaffMember = await Staff.findByIdAndDelete(id);

    if (!deletedStaffMember) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteStaffMember;
